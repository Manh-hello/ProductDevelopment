import { AiError, AiJsonRequest, AiProvider } from "./types";

interface Options {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

/**
 * Chat Completions của OpenAI (và các gateway tương thích qua AI_BASE_URL).
 * Chỉ dùng tính năng tối thiểu/phổ biến nhất (`response_format: json_object`) để tương thích nhiều model;
 * không truyền temperature/max_tokens vì một số model từ chối các tham số này.
 */
export function createOpenAiProvider({ apiKey, model, baseUrl }: Options): AiProvider {
  const endpoint = `${(baseUrl ?? "https://api.openai.com/v1").replace(/\/$/, "")}/chat/completions`;

  return {
    name: "openai",
    model,
    async completeJson({ system, user }: AiJsonRequest, signal: AbortSignal): Promise<string> {
      const res = await fetch(endpoint, {
        method: "POST",
        signal,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) throw await upstreamError(res);

      const json = (await res.json().catch(() => null)) as { choices?: { message?: { content?: string | null } }[] } | null;
      const content = json?.choices?.[0]?.message?.content;
      if (!content) throw new AiError("INVALID_OUTPUT", "Dịch vụ AI không trả về nội dung.", 502);
      return content;
    },
  };
}

/** Chuyển HTTP lỗi thành AiError an toàn: log mã trạng thái/loại lỗi, KHÔNG đưa nội dung phản hồi hay key ra ngoài. */
async function upstreamError(res: Response): Promise<AiError> {
  const body = (await res.json().catch(() => null)) as { error?: { type?: string; code?: string } } | null;
  console.warn(`[AI:openai] HTTP ${res.status}`, body?.error?.type ?? "", body?.error?.code ?? "");
  return mapStatus(res.status);
}

export function mapStatus(status: number): AiError {
  if (status === 401 || status === 403) return new AiError("UPSTREAM", "Dịch vụ AI từ chối yêu cầu. Quản trị viên cần kiểm tra cấu hình AI của máy chủ.", 502);
  if (status === 429) return new AiError("UPSTREAM", "Dịch vụ AI đang quá tải hoặc đã hết hạn mức. Vui lòng thử lại sau ít phút.", 503);
  return new AiError("UPSTREAM", "Dịch vụ AI gặp lỗi. Vui lòng thử lại sau.", 502);
}
