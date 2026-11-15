import { mapStatus } from "./openai.provider";
import { AiError, AiJsonRequest, AiProvider } from "./types";

interface Options {
  apiKey: string;
  model: string;
}

/** Gemini `generateContent` (REST) với `responseMimeType: application/json`. Key gửi qua header, không nằm trên URL. */
export function createGeminiProvider({ apiKey, model }: Options): AiProvider {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  return {
    name: "gemini",
    model,
    async completeJson({ system, user }: AiJsonRequest, signal: AbortSignal): Promise<string> {
      const res = await fetch(endpoint, {
        method: "POST",
        signal,
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: { status?: string } } | null;
        console.warn(`[AI:gemini] HTTP ${res.status}`, body?.error?.status ?? "");
        throw mapStatus(res.status);
      }

      const json = (await res.json().catch(() => null)) as { candidates?: { content?: { parts?: { text?: string }[] } }[] } | null;
      const text = json?.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
      if (!text.trim()) throw new AiError("INVALID_OUTPUT", "Dịch vụ AI không trả về nội dung.", 502);
      return text;
    },
  };
}
