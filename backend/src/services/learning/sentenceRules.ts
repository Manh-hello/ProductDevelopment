import { stripPunctuation } from "../../utils/text";

export interface CandidateWord {
  vocabularyId: string;
  hanzi: string;
  role: "target" | "known";
}

export interface RawSentence {
  hanzi: string;
  meaning: string;
  explanation?: string | null;
}

export type DropReason = "invalid" | "no_translation" | "no_target_word" | "duplicate";

const HAN_RE = /[\u3400-\u9fff\uf900-\ufaff]/g;

/**
 * Từ nào trong danh sách ứng viên THỰC SỰ xuất hiện trong câu (khớp chuỗi con của Hán tự).
 * Không dựa vào lời AI tự khai "wordsUsed" - AI hay khai man.
 * Hạn chế đã biết: không phân tích ngữ pháp nên từ ly hợp bị tách (吃了饭 với 吃饭) sẽ không được tính.
 */
export function findUsedWords(sentence: string, candidates: CandidateWord[]): CandidateWord[] {
  const seen = new Set<string>();
  return candidates.filter((c) => {
    if (seen.has(c.vocabularyId) || !sentence.includes(c.hanzi)) return false;
    seen.add(c.vocabularyId);
    return true;
  });
}

export function sentenceKey(sentence: string): string {
  return stripPunctuation(sentence);
}

/**
 * Lọc 1 câu do AI sinh ra. Trả về `{ ok: true, usedWords }` hoặc `{ ok: false, reason }`.
 * `seenKeys` chứa khoá các câu đã có (trong lô này + câu user đã lưu + câu ví dụ) và được cập nhật khi nhận câu mới.
 */
export function validateGeneratedSentence(
  raw: RawSentence,
  candidates: CandidateWord[],
  seenKeys: Set<string>
): { ok: true; usedWords: CandidateWord[] } | { ok: false; reason: DropReason } {
  const hanzi = raw.hanzi.trim();
  const hanCount = (hanzi.match(HAN_RE) ?? []).length;
  if (hanCount < 2 || Array.from(hanzi).length > 80) return { ok: false, reason: "invalid" };
  if (!raw.meaning.trim()) return { ok: false, reason: "no_translation" };

  const usedWords = findUsedWords(hanzi, candidates);
  if (!usedWords.some((w) => w.role === "target")) return { ok: false, reason: "no_target_word" };

  const key = sentenceKey(hanzi);
  if (seenKeys.has(key)) return { ok: false, reason: "duplicate" };
  seenKeys.add(key);

  return { ok: true, usedWords };
}
