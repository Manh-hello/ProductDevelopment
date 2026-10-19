import { pinyin } from "pinyin-pro";

/**
 * Tiện ích Pinyin dùng cho ô nhập từ vựng:
 *  - Hán tự            → Pinyin có dấu   (老师  → lǎoshī)
 *  - Pinyin số thanh   → Pinyin có dấu   (lao3shi1 → lǎoshī, nv3 → nǚ)
 *  - Văn bản trộn       → xử lý từng phần, giữ nguyên phần còn lại
 */

const HANZI_RUN_RE = /[\u3400-\u9fff\uf900-\ufaff]+/g;
const HAS_HANZI_RE = /[\u3400-\u9fff\uf900-\ufaff]/;
/** Một âm tiết viết bằng chữ cái + số thanh 1-5 (vd "lao3", "lü4", "nv3", "shi1"). */
const NUMBERED_SYLLABLE_RE = /[a-züv:]+[1-5]/gi;
const HAS_NUMBERED_RE = /[a-züv:]+[1-5]/i;

const TONE_MARKS: Record<string, string> = {
  a: "āáǎà",
  e: "ēéěè",
  i: "īíǐì",
  o: "ōóǒò",
  u: "ūúǔù",
  ü: "ǖǘǚǜ",
};

export type PinyinStyle = "word" | "sentence";

export function hasHanzi(text: string): boolean {
  return HAS_HANZI_RE.test(text);
}

export function hasNumberedPinyin(text: string): boolean {
  return HAS_NUMBERED_RE.test(text.normalize("NFC"));
}

/** Đặt dấu thanh cho một âm tiết đã bỏ số: a/e ưu tiên, "ou" → o, còn lại nguyên âm cuối. */
function placeTone(syllable: string, tone: number): string {
  const base = syllable.toLowerCase().replace(/u:|v/g, "ü");
  if (tone < 1 || tone > 4) return base; // thanh 5 / thanh nhẹ: không dấu
  const vowels = [...base].filter((c) => "aeiouü".includes(c));
  if (vowels.length === 0) return base;

  let target: string;
  if (base.includes("a")) target = "a";
  else if (base.includes("e")) target = "e";
  else if (base.includes("ou")) target = "o";
  else target = vowels[vowels.length - 1];

  const idx = base.lastIndexOf(target);
  return base.slice(0, idx) + TONE_MARKS[target][tone - 1] + base.slice(idx + 1);
}

/** lao3shi1 → lǎoshī. Chuỗi không có số thanh được giữ nguyên. */
export function numberedToToneMarks(text: string): string {
  return text.normalize("NFC").replace(NUMBERED_SYLLABLE_RE, (token) => {
    const tone = Number(token[token.length - 1]);
    const syllable = token.slice(0, -1);
    // Bỏ qua token không phải âm tiết (vd "hsk4", "k3") để khỏi làm hỏng văn bản thường.
    if (!/[aeiouüv]/i.test(syllable)) return token;
    return placeTone(syllable, tone);
  });
}

/** Đổi các cụm Hán tự trong chuỗi sang Pinyin có dấu; phần còn lại giữ nguyên. */
export function hanziToPinyin(text: string, style: PinyinStyle = "word"): string {
  const joiner = style === "sentence" ? " " : "";
  return text.replace(HANZI_RUN_RE, (run) => {
    const syllables = pinyin(run, { toneType: "symbol", type: "array" });
    return ` ${syllables.join(joiner)} `;
  });
}

export interface PinyinConversion {
  pinyin: string;
  /** Đầu vào có chứa Hán tự (đã được đổi sang Pinyin). */
  hadHanzi: boolean;
  /** Đầu vào có Pinyin số thanh (đã được đổi sang dấu thanh). */
  hadToneNumbers: boolean;
}

export function convertToPinyin(input: string, style: PinyinStyle = "word"): PinyinConversion {
  const hadHanzi = hasHanzi(input);
  const hadToneNumbers = hasNumberedPinyin(input);

  let out = input.normalize("NFC");
  if (hadHanzi) out = hanziToPinyin(out, style);
  if (hadToneNumbers) out = numberedToToneMarks(out);

  // Dọn khoảng trắng thừa sinh ra khi ghép; bỏ khoảng trắng trước dấu câu.
  out = out
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:，。！？；：、])/g, "$1")
    .trim();

  return { pinyin: out, hadHanzi, hadToneNumbers };
}
