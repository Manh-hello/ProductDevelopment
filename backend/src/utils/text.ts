/** Tiện ích chuẩn hoá văn bản cho việc chấm đáp án & sinh bài tập. */

const PUNCTUATION_RE = /[\s\u3000.,!?;:'"()\[\]{}<>~`@#$%^&*_+=|\\/\-—–…·，。！？；：、“”‘’（）《》【】「」『』]/g;

/** So khớp chuỗi thông thường: bỏ khoảng trắng đầu/cuối, chữ thường, chuẩn hoá Unicode (NFC). */
export function normalize(value: string): string {
  return value.normalize("NFC").trim().toLowerCase();
}

/** Bỏ toàn bộ dấu câu + khoảng trắng - dùng khi so sánh câu tiếng Trung. */
export function stripPunctuation(value: string): string {
  return normalize(value).replace(PUNCTUATION_RE, "");
}

/** Bỏ dấu thanh của pinyin (lǎoshī → laoshi) và khoảng trắng. */
export function stripPinyinTones(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ü/g, "v")
    .replace(/[\s'’]/g, "")
    .toLowerCase();
}

export function isHanzi(ch: string): boolean {
  return /[\u3400-\u9fff\uf900-\ufaff]/.test(ch);
}

/**
 * Tách câu tiếng Trung thành các "mảnh" để xếp lại.
 * Ưu tiên khớp từ dài nhất có trong `knownWords` (kho từ vựng), ký tự còn lại tách từng chữ;
 * dấu câu cuối câu được tách riêng. Sau đó gộp bớt các mảnh 1 ký tự liền nhau để câu không bị quá vụn.
 */
export function tokenizeSentence(sentence: string, knownWords: string[]): string[] {
  const words = [...new Set(knownWords.filter((w) => w.length > 1))].sort((a, b) => b.length - a.length);
  const chars = Array.from(sentence.trim());
  const tokens: string[] = [];
  let i = 0;
  while (i < chars.length) {
    const rest = chars.slice(i).join("");
    const match = words.find((w) => rest.startsWith(w));
    if (match) {
      tokens.push(match);
      i += Array.from(match).length;
    } else {
      tokens.push(chars[i]);
      i += 1;
    }
  }
  // Gộp các ký tự lẻ liền nhau (không phải dấu câu) thành cụm 2 ký tự.
  const merged: string[] = [];
  for (const t of tokens) {
    const last = merged[merged.length - 1];
    if (last && Array.from(last).length === 1 && Array.from(t).length === 1 && isHanzi(last) && isHanzi(t)) {
      merged[merged.length - 1] = last + t;
    } else {
      merged.push(t);
    }
  }
  return merged.filter((t) => t.trim().length > 0);
}

export function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Xáo trộn nhưng bảo đảm kết quả khác thứ tự gốc (khi có thể). */
export function shuffleDifferent<T>(arr: T[]): T[] {
  if (arr.length < 2) return [...arr];
  const original = arr.join("\u0000");
  for (let attempt = 0; attempt < 8; attempt++) {
    const copy = shuffleInPlace([...arr]);
    if (copy.join("\u0000") !== original) return copy;
  }
  return [...arr].reverse();
}
