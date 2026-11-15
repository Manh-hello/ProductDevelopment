import { HSK_LEVELS, SENTENCE_TOPICS } from "../../constants/sentenceTopics";
import { AppError } from "../../utils/AppError";
import { shuffleInPlace } from "../../utils/text";
import { GenerateSentencesInput } from "../../validators/ai.validator";

/** Dòng dữ liệu tối thiểu của 1 từ trong danh sách học của user (đã làm phẳng, không phụ thuộc Prisma để dễ test). */
export interface WordRow {
  vocabularyId: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: string | null;
  tags: string[];
  status: string;
  incorrectCount: number;
  nextReviewAt: Date | null;
  createdAt: Date;
}

export interface WordSelection {
  /** Từ mà mỗi câu phải dùng ít nhất một. */
  targets: WordRow[];
  /** Từ đã học được phép dùng thêm cho câu tự nhiên (kết hợp từ mới + từ cũ). */
  helpers: WordRow[];
  warnings: string[];
}

export const MAX_TARGETS = 5;
export const MAX_HELPERS = 8;

export function parseHskNumber(level: string | null | undefined): number | null {
  const m = level?.match(/(?:HSK)?\s*([1-6])\b/i);
  return m ? Number(m[1]) : null;
}

const isDue = (w: WordRow, now: Date) => w.nextReviewAt !== null && w.nextReviewAt <= now;
const isWeak = (w: WordRow) => w.incorrectCount >= 2;
const isNew = (w: WordRow) => w.status === "new";

/** Ưu tiên từ đến hạn ôn > từ mới > từ yếu > còn lại; xáo trộn trước để cùng ưu tiên thì ngẫu nhiên (câu mỗi lần một khác). */
function byPriority(rows: WordRow[], now: Date): WordRow[] {
  const score = (w: WordRow) => (isDue(w, now) ? 3 : isNew(w) ? 2 : isWeak(w) ? 1 : 0);
  return shuffleInPlace([...rows]).sort((a, b) => score(b) - score(a));
}

const sample = (rows: WordRow[], n: number) => shuffleInPlace([...rows]).slice(0, n);

/** Từ "cũ" (đã học/đang học) ưu tiên làm từ bổ trợ để kết hợp với từ mới. */
function pickHelpers(all: WordRow[], exclude: Set<string>, max: number): WordRow[] {
  const rest = all.filter((w) => !exclude.has(w.vocabularyId));
  const older = rest.filter((w) => !isNew(w));
  const pool = older.length >= 2 ? older : rest;
  return sample(pool, max);
}

/**
 * Chọn tập từ NHỎ (<= 5 mục tiêu + <= 8 bổ trợ) theo chế độ - KHÔNG gửi cả vốn từ cho AI.
 * Chỉ dùng từ trong danh sách học của đúng user (`rows` đã được lọc theo userId ở nơi gọi).
 */
export function selectWords(rows: WordRow[], input: GenerateSentencesInput, now = new Date()): WordSelection {
  if (rows.length === 0) throw new AppError("Bạn chưa có từ vựng nào để tạo câu. Hãy thêm từ vào danh sách học trước.", 400);
  const warnings: string[] = [];
  let targets: WordRow[] = [];

  switch (input.mode) {
    case "new_word": {
      const word = rows.find((r) => r.vocabularyId === input.vocabularyId);
      if (!word) throw new AppError("Từ này chưa có trong danh sách học của bạn.", 404);
      targets = [word];
      break;
    }
    case "selected_words": {
      const ids = new Set(input.vocabularyIds ?? []);
      targets = rows.filter((r) => ids.has(r.vocabularyId));
      if (targets.length !== ids.size) throw new AppError("Có từ không thuộc danh sách học của bạn.", 400);
      break;
    }
    case "review_mix": {
      const pickedIds = new Set<string>();
      const take = (list: WordRow[], n: number) => {
        for (const w of list) {
          if (n <= 0) break;
          if (pickedIds.has(w.vocabularyId)) continue;
          pickedIds.add(w.vocabularyId);
          targets.push(w);
          n--;
        }
      };
      // Ưu tiên kết hợp từ MỚI với từ cần ôn để củng cố trí nhớ.
      take(byPriority(rows.filter(isNew), now), 2);
      take(byPriority(rows.filter((w) => isDue(w, now)), now), 2);
      take(byPriority(rows.filter(isWeak), now), 1);
      take(byPriority(rows, now), Math.min(MAX_TARGETS, Math.max(3, rows.length)) - targets.length);
      targets = targets.slice(0, MAX_TARGETS);
      break;
    }
    case "topic": {
      const label = SENTENCE_TOPICS.find((t) => t.key === input.topic)?.label.toLowerCase() ?? "";
      const matched = rows.filter((r) => r.tags.some((t) => t.toLowerCase().includes(label) || t.toLowerCase() === input.topic));
      if (matched.length > 0) targets = byPriority(matched, now).slice(0, MAX_TARGETS);
      else {
        targets = sample(rows, 4);
        warnings.push("Chưa có từ nào gắn thẻ chủ đề này nên hệ thống dùng các từ bất kỳ trong ngữ cảnh chủ đề đã chọn.");
      }
      break;
    }
    case "level": {
      const max = Number(input.level?.replace(/\D/g, "")) || HSK_LEVELS.length;
      const eligible = rows.filter((r) => {
        const n = parseHskNumber(r.level);
        return n !== null && n <= max;
      });
      if (eligible.length > 0) targets = byPriority(eligible, now).slice(0, 4);
      else {
        targets = sample(rows, 4);
        warnings.push("Chưa đủ dữ liệu cấp độ HSK cho từ của bạn nên độ khó chỉ là ước lượng theo trình độ đã chọn.");
      }
      break;
    }
  }

  const helpers = pickHelpers(rows, new Set(targets.map((t) => t.vocabularyId)), input.mode === "selected_words" ? 6 : MAX_HELPERS);
  return { targets, helpers, warnings };
}
