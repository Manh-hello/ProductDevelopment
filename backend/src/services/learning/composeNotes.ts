import type { AiWord } from "./wordLookup.prompts";

/** Gom cách dùng / kết hợp từ / từ dễ nhầm thành văn bản cho ô Ghi chú chung (người dùng có thể sửa tự do). */
export function composeNotes(w: Pick<AiWord, "usage" | "collocations" | "synonyms">): string | null {
  const parts: string[] = [];
  if (w.usage) parts.push(`Cách dùng: ${w.usage}`);
  if (w.collocations.length) {
    parts.push(`Kết hợp thường gặp: ${w.collocations.map((c) => (c.meaning ? `${c.phrase} (${c.meaning})` : c.phrase)).join("; ")}`);
  }
  if (w.synonyms.length) {
    parts.push(`Từ đồng nghĩa / dễ nhầm: ${w.synonyms.map((s) => (s.note ? `${s.word} — ${s.note}` : s.word)).join("; ")}`);
  }
  const text = parts.join("\n");
  return text ? text.slice(0, 2000) : null;
}
