import { ZodTypeAny, z } from "zod";
import { env } from "../../config/env";
import { createGeminiProvider } from "./gemini.provider";
import { parseJsonLoose } from "./json";
import { createOpenAiProvider } from "./openai.provider";
import { AiError, AiJsonRequest, AiProvider } from "./types";

export { AiError } from "./types";
export type { AiErrorCode, AiProvider } from "./types";

let cached: AiProvider | null | undefined;

/** Trạng thái cấu hình AI (không chứa key) - dùng để quyết định fallback / hiển thị hướng dẫn. */
export function isAiConfigured(): boolean {
  return Boolean(env.AI_PROVIDER && env.AI_API_KEY && env.AI_MODEL);
}

/** Trả về provider đã cấu hình hoặc `null` (không throw) - để các service chủ động fallback. */
export function getAiProvider(): AiProvider | null {
  if (cached !== undefined) return cached;
  if (!env.AI_PROVIDER || !env.AI_API_KEY || !env.AI_MODEL) {
    cached = null;
    return cached;
  }
  cached =
    env.AI_PROVIDER === "gemini"
      ? createGeminiProvider({ apiKey: env.AI_API_KEY, model: env.AI_MODEL })
      : createOpenAiProvider({ apiKey: env.AI_API_KEY, model: env.AI_MODEL, baseUrl: env.AI_BASE_URL });
  return cached;
}

export function aiIdentity(): string {
  const p = getAiProvider();
  return p ? `${p.name}:${p.model}` : "none";
}

export const AI_NOT_CONFIGURED_MESSAGE =
  "Tính năng AI chưa được cấu hình. Quản trị viên cần đặt AI_PROVIDER, AI_API_KEY và AI_MODEL trong backend/.env (xem docs/setup.md).";

const MAX_ATTEMPTS = 2; // 1 lần gọi + tối đa 1 lần thử lại khi JSON/schema không hợp lệ (không retry lỗi mạng/timeout để tránh tốn phí)

/**
 * Gọi LLM và ép kết quả qua Zod. KHÔNG tin JSON do LLM trả về:
 * parse lỏng → kiểm tra schema → nếu sai thì thử lại đúng 1 lần → vẫn sai thì ném AiError(INVALID_OUTPUT).
 */
export async function generateValidatedJson<S extends ZodTypeAny>(schema: S, req: AiJsonRequest): Promise<z.infer<S>> {
  const provider = getAiProvider();
  if (!provider) throw new AiError("NOT_CONFIGURED", AI_NOT_CONFIGURED_MESSAGE, 503);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const started = Date.now();
    let raw: string;
    try {
      raw = await callWithTimeout(provider, req);
    } catch (err) {
      if (err instanceof AiError) throw err;
      if ((err as Error)?.name === "AbortError") {
        console.warn(`[AI:${provider.name}] timeout after ${Date.now() - started}ms`);
        throw new AiError("TIMEOUT", "Dịch vụ AI phản hồi quá chậm. Vui lòng thử lại.", 504);
      }
      // Lỗi mạng/DNS... - chỉ log tên lỗi, không log message (có thể chứa URL).
      console.warn(`[AI:${provider.name}] request failed`, (err as Error)?.name ?? "UnknownError");
      throw new AiError("UPSTREAM", "Không kết nối được dịch vụ AI. Vui lòng thử lại sau.", 502);
    }

    try {
      const parsed = schema.safeParse(parseJsonLoose(raw));
      if (parsed.success) return parsed.data;
      console.warn(`[AI:${provider.name}] schema mismatch (attempt ${attempt}/${MAX_ATTEMPTS})`);
    } catch {
      console.warn(`[AI:${provider.name}] invalid JSON (attempt ${attempt}/${MAX_ATTEMPTS})`);
    }
  }
  throw new AiError("INVALID_OUTPUT", "AI trả về dữ liệu không hợp lệ. Vui lòng thử lại.", 502);
}

async function callWithTimeout(provider: AiProvider, req: AiJsonRequest): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), env.AI_TIMEOUT_MS);
  try {
    return await provider.completeJson(req, controller.signal);
  } finally {
    clearTimeout(timer);
  }
}
