import { isHanzi } from "../../utils/text";

export type InputKind = "word" | "phrase" | "sentence" | "not_chinese";

export interface ClassifiedInput {
  /** Chuỗi đã chuẩn hoá (NFC, bỏ khoảng trắng và dấu câu ở hai đầu). */
  normalized: string;
  kind: InputKind;
  hanziCount: number;
}

const SENTENCE_PUNCT_RE = /[，。！？；：、,.!?;:]/;
const EDGE_PUNCT_RE = /^[\s，。！？；：、,.!?;:"'“”‘’（）()《》【】「」『』]+|[\s，。！？；：、,.!?;:"'“”‘’（）()《》【】「」『』]+$/g;

/**
 * Xác định đầu vào là từ đơn / cụm từ / câu TRƯỚC khi tốn công tra cứu hay gọi AI.
 *  - word: 1-4 chữ Hán (gồm thành ngữ 4 chữ)
 *  - phrase: 5-10 chữ Hán
 *  - sentence: > 10 chữ Hán, hoặc còn dấu câu / khoảng trắng ở giữa
 *  - not_chinese: không có chữ Hán nào
 */
export function classifyInput(raw: string): ClassifiedInput {
  const normalized = raw.normalize("NFC").replace(EDGE_PUNCT_RE, "");
  const hanziCount = Array.from(normalized).filter(isHanzi).length;

  if (hanziCount === 0) return { normalized, kind: "not_chinese", hanziCount };
  if (SENTENCE_PUNCT_RE.test(normalized) || /\s/.test(normalized) || hanziCount > 10) {
    return { normalized, kind: "sentence", hanziCount };
  }
  return { normalized, kind: hanziCount <= 4 ? "word" : "phrase", hanziCount };
}
