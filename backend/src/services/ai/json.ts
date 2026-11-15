/**
 * Tách JSON từ văn bản LLM trả về. Dù đã yêu cầu "chỉ JSON", một số model vẫn bọc trong ```json ... ```
 * hoặc thêm lời dẫn; hàm này xử lý các trường hợp đó nhưng KHÔNG sửa JSON hỏng (sẽ throw).
 * Module thuần, không phụ thuộc env/prisma để dễ test.
 */
export function parseJsonLoose(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const candidate = fenced ? fenced[1] : trimmed;

  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("Không tìm thấy JSON object trong phản hồi.");
    return JSON.parse(candidate.slice(start, end + 1));
  }
}
