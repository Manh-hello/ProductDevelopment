import { randomUUID } from "node:crypto";
import { prisma } from "../../config/prisma";
import { topicLabel } from "../../constants/sentenceTopics";
import { AI_NOT_CONFIGURED_MESSAGE, AiError, generateValidatedJson, isAiConfigured } from "../ai";
import { AppError } from "../../utils/AppError";
import { convertToPinyin } from "../../utils/pinyin";
import { GenerateSentencesInput } from "../../validators/ai.validator";
import { aiSentencesSchema, sentencesSystemPrompt, sentencesUserPrompt } from "./sentenceGeneration.prompts";
import { CandidateWord, DropReason, findUsedWords, sentenceKey, validateGeneratedSentence } from "./sentenceRules";
import { WordRow, parseHskNumber, selectWords } from "./wordSelection";

export interface GeneratedSentence {
  /** Khoá tạm cho giao diện - KHÔNG phải id trong database (câu chưa được lưu). */
  tempId: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  explanation: string | null;
  usedWords: CandidateWord[];
  /** Từ mục tiêu chính (dùng làm `vocabularyId` khi lưu). */
  primaryVocabularyId: string;
  topic: string | null;
  /** Trình độ ƯỚC LƯỢNG, không phải đã xác minh. */
  level: string | null;
  source: "ai" | "existing";
}

export interface GenerateSentencesResult {
  mode: GenerateSentencesInput["mode"];
  sentences: GeneratedSentence[];
  targets: { vocabularyId: string; hanzi: string; pinyin: string; meaning: string }[];
  levelEstimated: true;
  /** true = AI không dùng được, đang hiển thị câu ví dụ có sẵn. */
  usedFallback: boolean;
  ai: { status: "ok" | "fallback"; message: string | null };
  warnings: string[];
  generatedAt: string;
}

const DROP_LABEL: Record<DropReason, string> = {
  invalid: "câu không hợp lệ",
  no_translation: "thiếu bản dịch",
  no_target_word: "không chứa từ mục tiêu",
  duplicate: "bị trùng",
};

async function loadUserWords(userId: string): Promise<WordRow[]> {
  const rows = await prisma.userVocabulary.findMany({
    where: { userId },
    include: { vocabulary: { include: { tags: { include: { tag: true } } } } },
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return rows.map((r) => ({
    vocabularyId: r.vocabularyId,
    hanzi: r.vocabulary.hanzi,
    pinyin: r.vocabulary.pinyin,
    meaning: r.vocabulary.meaning,
    level: r.vocabulary.level,
    tags: r.vocabulary.tags.map((t) => t.tag.name),
    status: r.status,
    incorrectCount: r.incorrectCount,
    nextReviewAt: r.nextReviewAt,
    createdAt: r.createdAt,
  }));
}

/** Trình độ gửi cho AI: do user chọn, hoặc ước lượng theo từ mục tiêu (HSK cao nhất đã biết, mặc định HSK 2). */
function levelHint(input: GenerateSentencesInput, targets: WordRow[]): string {
  if (input.level) return input.level;
  const known = targets.map((t) => parseHskNumber(t.level)).filter((n): n is number => n !== null);
  return `HSK ${known.length ? Math.max(...known) : 2}`;
}

/**
 * Sinh câu từ vốn từ CỦA USER ĐANG ĐĂNG NHẬP. Kết quả chỉ là bản xem trước - KHÔNG ghi gì vào database
 * (lưu qua POST /user-sentences). Pinyin luôn do thư viện tính trên cả câu (đúng từ đa âm theo ngữ cảnh), không lấy từ AI.
 */
export async function generateSentences(userId: string, input: GenerateSentencesInput): Promise<GenerateSentencesResult> {
  const rows = await loadUserWords(userId);
  const { targets, helpers, warnings } = selectWords(rows, input);

  const candidates: CandidateWord[] = [
    ...targets.map((t) => ({ vocabularyId: t.vocabularyId, hanzi: t.hanzi, role: "target" as const })),
    ...helpers.map((h) => ({ vocabularyId: h.vocabularyId, hanzi: h.hanzi, role: "known" as const })),
  ];
  const targetIds = targets.map((t) => t.vocabularyId);

  // Câu đã có (user đã lưu + câu ví dụ của từ) → tránh sinh trùng.
  const [saved, examples] = await Promise.all([
    prisma.userSentence.findMany({ where: { userId, vocabularyId: { in: targetIds } }, select: { sentence: true } }),
    prisma.vocabularyExample.findMany({ where: { vocabularyId: { in: targetIds } } }),
  ]);
  const existingKeys = new Set<string>([...saved.map((s) => sentenceKey(s.sentence)), ...examples.map((e) => sentenceKey(e.sentenceHanzi))]);

  const level = levelHint(input, targets);
  const topic = input.topic ?? null;
  const base = {
    mode: input.mode,
    targets: targets.map((t) => ({ vocabularyId: t.vocabularyId, hanzi: t.hanzi, pinyin: t.pinyin, meaning: t.meaning })),
    levelEstimated: true as const,
    generatedAt: new Date().toISOString(),
  };

  const toGenerated = (
    hanzi: string,
    meaning: string,
    explanation: string | null,
    usedWords: CandidateWord[],
    source: "ai" | "existing"
  ): GeneratedSentence => ({
    tempId: randomUUID(),
    hanzi: hanzi.trim(),
    pinyin: convertToPinyin(hanzi, "sentence").pinyin,
    meaning: meaning.trim(),
    explanation,
    usedWords,
    primaryVocabularyId: usedWords.find((w) => w.role === "target")!.vocabularyId,
    topic,
    level: source === "ai" ? level : null,
    source,
  });

  let aiError: AiError | null = null;

  if (!isAiConfigured()) {
    aiError = new AiError("NOT_CONFIGURED", AI_NOT_CONFIGURED_MESSAGE, 503);
  } else {
    try {
      const wanted = Math.min(input.count + 1, 6); // xin dư 1 câu để bù câu bị loại khi kiểm tra
      const res = await generateValidatedJson(aiSentencesSchema, {
        system: sentencesSystemPrompt(level),
        user: sentencesUserPrompt({
          count: wanted,
          targetWords: targets.map((t) => ({ hanzi: t.hanzi, meaning: t.meaning })),
          knownWords: helpers.map((h) => h.hanzi),
          topic: input.topic ? topicLabel(input.topic) : undefined,
          level,
        }),
      });

      const seen = new Set(existingKeys);
      const dropped: Record<DropReason, number> = { invalid: 0, no_translation: 0, no_target_word: 0, duplicate: 0 };
      const accepted: GeneratedSentence[] = [];
      for (const raw of res.sentences) {
        if (!raw) {
          dropped.invalid++;
          continue;
        }
        const verdict = validateGeneratedSentence({ hanzi: raw.hanzi, meaning: raw.meaning, explanation: raw.explanation }, candidates, seen);
        if (!verdict.ok) {
          dropped[verdict.reason]++;
          continue;
        }
        accepted.push(toGenerated(raw.hanzi, raw.meaning, raw.explanation ?? null, verdict.usedWords, "ai"));
      }

      const sentences = accepted.slice(0, input.count);
      const droppedList = (Object.keys(dropped) as DropReason[]).filter((k) => dropped[k] > 0).map((k) => `${dropped[k]} ${DROP_LABEL[k]}`);
      if (droppedList.length) warnings.push(`Đã loại một số câu do AI tạo: ${droppedList.join(", ")}.`);

      if (sentences.length > 0) {
        if (sentences.length < input.count) warnings.push(`Chỉ có ${sentences.length}/${input.count} câu đạt yêu cầu. Bấm "Tạo lại" để thử lần nữa.`);
        return { ...base, sentences, usedFallback: false, ai: { status: "ok", message: null }, warnings };
      }
      aiError = new AiError("INVALID_OUTPUT", "AI chưa tạo được câu phù hợp với các từ đã chọn. Vui lòng thử lại.", 502);
    } catch (err) {
      if (!(err instanceof AiError)) throw err;
      aiError = err;
    }
  }

  // --- Fallback: AI không dùng được → dùng câu ví dụ CÓ SẴN (chỉ câu thực sự chứa từ mục tiêu, chưa được user lưu) ---
  const savedKeys = new Set(saved.map((s) => sentenceKey(s.sentence)));
  const fallback: GeneratedSentence[] = [];
  for (const ex of examples) {
    if (fallback.length >= input.count) break;
    if (savedKeys.has(sentenceKey(ex.sentenceHanzi))) continue;
    const used = findUsedWords(ex.sentenceHanzi, candidates);
    if (!used.some((w) => w.role === "target")) continue;
    fallback.push(toGenerated(ex.sentenceHanzi, ex.sentenceMeaning, null, used, "existing"));
  }

  if (fallback.length === 0) throw aiError ?? new AppError("Không tạo được câu.", 500);

  warnings.push("AI hiện không khả dụng nên đang hiển thị câu ví dụ có sẵn trong kho từ vựng.");
  return { ...base, sentences: fallback, usedFallback: true, ai: { status: "fallback", message: aiError?.message ?? null }, warnings };
}
