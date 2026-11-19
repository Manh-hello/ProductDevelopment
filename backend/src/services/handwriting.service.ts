import { prisma } from "../config/prisma";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";
import { getRecognizer, RecognizerError } from "./handwriting";

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;
export type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number];

export type RecognitionStatus = "recognized" | "low_confidence" | "unrecognized" | "no_content";

/** Kiểm tra chữ ký (magic bytes) khớp với MIME khai báo - không tin Content-Type từ client. */
export function matchesImageSignature(buf: Buffer, mime: string): boolean {
  if (mime === "image/png") return buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (mime === "image/jpeg") return buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  if (mime === "image/webp") return buf.length > 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}

const MESSAGES: Record<RecognitionStatus, string> = {
  recognized: "Model đã nhận diện được chữ bạn viết.",
  low_confidence: "Model không chắc chắn về kết quả. Hãy viết to, rõ nét, một chữ duy nhất ở giữa khung rồi gửi lại.",
  unrecognized: "Model không nhận diện được chữ này. Hãy viết rõ hơn, một chữ trên nền sáng và gửi lại.",
  no_content: "Không thấy nét chữ nào trong ảnh. Hãy viết chữ Hán vào khung (nét đậm, nền sáng) rồi gửi lại.",
};

export async function getStatus() {
  const recognizer = getRecognizer();
  const configured = recognizer.isConfigured();
  return {
    configured,
    available: configured ? await recognizer.isReachable() : false,
    provider: configured ? recognizer.name : null,
    minConfidence: env.HANDWRITING_MIN_CONFIDENCE,
    maxImageBytes: env.HANDWRITING_MAX_IMAGE_BYTES,
    acceptedMimeTypes: ACCEPTED_IMAGE_TYPES,
    // Model hiện tại chỉ phân loại chữ; không có phân tích nét/thứ tự nét nên API không trả "lỗi/gợi ý sửa".
    analysisSupported: false,
  };
}

export async function recognize(userId: string, input: { image: Buffer; mimeType: AcceptedImageType; vocabularyId?: string }) {
  const recognizer = getRecognizer();
  if (!recognizer.isConfigured()) {
    throw new AppError("Chức năng nhận diện chữ viết chưa được cấu hình trên máy chủ.", 503);
  }

  // Từ mục tiêu (tuỳ chọn) phải thuộc danh sách học của CHÍNH người dùng.
  let target: { id: string; hanzi: string } | null = null;
  if (input.vocabularyId) {
    const uv = await prisma.userVocabulary.findUnique({
      where: { userId_vocabularyId: { userId, vocabularyId: input.vocabularyId } },
      select: { vocabulary: { select: { id: true, hanzi: true } } },
    });
    if (!uv) throw new AppError("Từ này chưa có trong danh sách học của bạn.", 404);
    target = uv.vocabulary;
  }

  let output;
  try {
    output = await recognizer.recognize(input.image, input.mimeType);
  } catch (e) {
    if (e instanceof RecognizerError && e.kind === "invalid_image") throw new AppError("Không đọc được ảnh. Hãy thử ảnh PNG/JPEG/WebP khác.", 422);
    console.error("[Handwriting] Lỗi dịch vụ nhận diện:", e instanceof Error ? e.message : "unknown error");
    throw new AppError("Dịch vụ nhận diện tạm thời không khả dụng. Vui lòng thử lại sau.", 503);
  }

  const top = output.candidates[0] ?? null;
  const status: RecognitionStatus = output.blank
    ? "no_content"
    : !top
      ? "unrecognized"
      : top.confidence < env.HANDWRITING_MIN_CONFIDENCE
        ? "low_confidence"
        : "recognized";

  // Đối chiếu với từ đang luyện: model nhận diện từng CHỮ nên so với các chữ của từ.
  let match: { targetChars: string[]; unsupportedChars: string[]; matchesTarget: boolean | null } | null = null;
  if (target) {
    const targetChars = [...new Set(Array.from(target.hanzi))];
    const supported = await recognizer.supportedCharacters();
    const unsupportedChars = supported ? targetChars.filter((c) => !supported.has(c)) : [];
    match = {
      targetChars,
      unsupportedChars,
      matchesTarget: top && (status === "recognized" || status === "low_confidence") ? targetChars.includes(top.char) : null,
    };
  }

  const attempt = await prisma.handwritingAttempt.create({
    data: {
      userId,
      vocabularyId: target?.id,
      status,
      predictedChar: top && status !== "no_content" ? top.char : null,
      confidence: top && status !== "no_content" ? top.confidence : null,
      matchesTarget: match?.matchesTarget ?? null,
    },
    select: { id: true },
  });

  return {
    attemptId: attempt.id,
    status,
    message: MESSAGES[status],
    predicted: top && status !== "no_content" ? top : null,
    candidates: status === "no_content" ? [] : output.candidates.slice(0, 3),
    minConfidence: env.HANDWRITING_MIN_CONFIDENCE,
    match,
    analysis: null,
    analysisSupported: false,
  };
}

export async function listAttempts(userId: string, limit: number) {
  return prisma.handwritingAttempt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, vocabularyId: true, status: true, predictedChar: true, confidence: true, matchesTarget: true, createdAt: true },
  });
}
