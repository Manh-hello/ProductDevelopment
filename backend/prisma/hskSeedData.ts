import fs from "fs";
import path from "path";
import { POS_LABELS, TOPIC_BY_CODE, formatHskLevel } from "../src/constants/catalog";
import { convertToPinyin } from "../src/utils/pinyin";

export interface HskWord {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: string;
  partOfSpeech: string;
  topic: string;
}

/**
 * Đọc prisma/data/hsk-vi.txt (HSK 1-3, nghĩa tiếng Việt + loại từ + chủ đề).
 * Định dạng mỗi dòng: hanzi|nghĩa|mã loại từ|mã chủ đề[|pinyin ghi đè]. Dòng "# HSK n" đặt cấp độ cho các dòng sau.
 * Pinyin mặc định do pinyin-pro tạo; chỉ ghi đè khi cần (thanh nhẹ, tên riêng...).
 */
export function loadHskWords(): HskWord[] {
  const file = path.join(__dirname, "data", "hsk-vi.txt");
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const words: HskWord[] = [];
  let level = "";

  lines.forEach((raw, idx) => {
    const line = raw.trim();
    if (!line) return;
    const header = line.match(/^#\s*HSK\s*([1-6])\s*$/i);
    if (header) {
      level = formatHskLevel(Number(header[1]));
      return;
    }
    if (line.startsWith("#")) return;

    const [hanzi, meaning, pos, topicCode, pinyinOverride] = line.split("|").map((s) => s.trim());
    const where = `${file}:${idx + 1}`;
    if (!level) throw new Error(`${where}: thiếu dòng "# HSK n" trước dữ liệu`);
    if (!hanzi || !meaning) throw new Error(`${where}: thiếu hanzi hoặc nghĩa`);
    const partOfSpeech = POS_LABELS[pos];
    if (!partOfSpeech) throw new Error(`${where}: mã loại từ không hợp lệ "${pos}"`);
    const topic = TOPIC_BY_CODE.get(Number(topicCode));
    if (!topic) throw new Error(`${where}: mã chủ đề không hợp lệ "${topicCode}"`);

    words.push({
      hanzi,
      pinyin: pinyinOverride || convertToPinyin(hanzi, "word").pinyin,
      meaning,
      level,
      partOfSpeech,
      topic: topic.name,
    });
  });
  return words;
}
