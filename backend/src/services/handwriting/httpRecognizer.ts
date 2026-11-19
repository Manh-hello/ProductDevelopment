import { env } from "../../config/env";
import { HandwritingRecognizer, RecognitionOutput, RecognizerError } from "./types";

const baseUrl = () => env.HANDWRITING_SERVICE_URL!.replace(/\/$/, "");
const authHeaders = (): Record<string, string> => (env.HANDWRITING_SERVICE_TOKEN ? { Authorization: `Bearer ${env.HANDWRITING_SERVICE_TOKEN}` } : {});

async function call(path: string, init: RequestInit & { timeoutMs?: number } = {}): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), init.timeoutMs ?? env.HANDWRITING_TIMEOUT_MS);
  try {
    return await fetch(`${baseUrl()}${path}`, { ...init, headers: { ...authHeaders(), ...(init.headers as Record<string, string> | undefined) }, signal: controller.signal });
  } catch {
    throw new RecognizerError("unavailable", "Không kết nối được dịch vụ nhận diện.");
  } finally {
    clearTimeout(timer);
  }
}

const isChar = (v: unknown): v is string => typeof v === "string" && Array.from(v).length === 1;
const isConfidence = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 1;

/**
 * Adapter cho dịch vụ model chạy riêng qua HTTP (thư mục `handwriting-service/`, bọc `Recognizer` của model đã train).
 *   POST /recognize   body = bytes ảnh, Content-Type = image/png|jpeg|webp
 *     200 { blank: boolean, topk: [{ label: "你", confidence: 0.93 }, ...] }
 *     400 ảnh không đọc được
 *   GET  /classes     200 { classes: ["一", ...] }
 *   GET  /health      200 { status: "ok" }
 */
export const httpRecognizer: HandwritingRecognizer = {
  name: "http",

  isConfigured: () => Boolean(env.HANDWRITING_SERVICE_URL),

  async isReachable() {
    try {
      return (await call("/health", { timeoutMs: 2000 })).ok;
    } catch {
      return false;
    }
  },

  async recognize(image, mimeType): Promise<RecognitionOutput> {
    const res = await call("/recognize", { method: "POST", headers: { "Content-Type": mimeType }, body: new Blob([image], { type: mimeType }) });
    if (res.status === 400 || res.status === 415 || res.status === 413) throw new RecognizerError("invalid_image", "Dịch vụ không đọc được ảnh.");
    if (!res.ok) throw new RecognizerError("unavailable", `Dịch vụ nhận diện trả lỗi ${res.status}.`);

    const json = (await res.json().catch(() => null)) as { blank?: unknown; topk?: unknown } | null;
    if (!json || typeof json.blank !== "boolean" || !Array.isArray(json.topk)) throw new RecognizerError("unavailable", "Dịch vụ nhận diện trả dữ liệu sai định dạng.");

    const candidates = json.topk
      .map((c) => c as { label?: unknown; confidence?: unknown })
      .filter((c) => isChar(c.label) && isConfidence(c.confidence))
      .map((c) => ({ char: c.label as string, confidence: c.confidence as number }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
    return { blank: json.blank, candidates };
  },

  async supportedCharacters() {
    try {
      const res = await call("/classes", { timeoutMs: 3000 });
      if (!res.ok) return null;
      const json = (await res.json()) as { classes?: unknown };
      return Array.isArray(json.classes) ? new Set(json.classes.filter(isChar)) : null;
    } catch {
      return null;
    }
  },
};
