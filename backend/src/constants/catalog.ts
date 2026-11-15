/**
 * Danh mục thư viện từ vựng: cấp độ HSK, trình độ người học và chủ đề.
 * Dùng chung cho seed (prisma/seed.ts) và API catalog.
 */

export const HSK_LEVEL_NUMBERS = [1, 2, 3, 4, 5, 6] as const;

export type BandKey = "beginner" | "intermediate" | "advanced";

export const LEARNER_BANDS: { key: BandKey; label: string; description: string; levels: number[] }[] = [
  { key: "beginner", label: "Sơ cấp", description: "Mới bắt đầu: chào hỏi, gia đình, số đếm, sinh hoạt hằng ngày.", levels: [1, 2] },
  { key: "intermediate", label: "Trung cấp", description: "Giao tiếp tự tin: công việc, du lịch, diễn đạt ý kiến.", levels: [3, 4] },
  { key: "advanced", label: "Cao cấp", description: "Đọc hiểu báo chí, văn bản dài và chủ đề trừu tượng.", levels: [5, 6] },
];

/** Chủ đề (lưu dưới dạng Tag). `code` khớp mã trong prisma/data/hsk-vi.txt. */
export const TOPICS: { code: number; name: string; icon: string }[] = [
  { code: 1, name: "Chào hỏi & giao tiếp", icon: "waving_hand" },
  { code: 2, name: "Gia đình & con người", icon: "family_restroom" },
  { code: 3, name: "Số đếm & lượng từ", icon: "123" },
  { code: 4, name: "Thời gian & ngày tháng", icon: "schedule" },
  { code: 5, name: "Ăn uống", icon: "restaurant" },
  { code: 6, name: "Mua sắm & tiền bạc", icon: "shopping_bag" },
  { code: 7, name: "Đi lại & du lịch", icon: "flight" },
  { code: 8, name: "Trường học & học tập", icon: "school" },
  { code: 9, name: "Công việc & công ty", icon: "work" },
  { code: 10, name: "Nhà cửa & đồ vật", icon: "chair" },
  { code: 11, name: "Cơ thể & sức khỏe", icon: "health_and_safety" },
  { code: 12, name: "Thời tiết & thiên nhiên", icon: "partly_cloudy_day" },
  { code: 13, name: "Hành động hằng ngày", icon: "directions_run" },
  { code: 14, name: "Tính chất & trạng thái", icon: "tune" },
  { code: 15, name: "Ngữ pháp & từ nối", icon: "link" },
  { code: 16, name: "Giải trí & thể thao", icon: "sports_esports" },
  { code: 17, name: "Địa điểm & phương hướng", icon: "explore" },
  { code: 18, name: "Màu sắc & quần áo", icon: "checkroom" },
  { code: 19, name: "Cảm xúc & ý kiến", icon: "mood" },
];

export const TOPIC_BY_CODE = new Map(TOPICS.map((t) => [t.code, t]));
export const TOPIC_ICON_BY_NAME = new Map(TOPICS.map((t) => [t.name, t.icon]));

/** Loại từ (mã trong file dữ liệu → tiếng Việt). */
export const POS_LABELS: Record<string, string> = {
  n: "Danh từ", v: "Động từ", a: "Tính từ", d: "Phó từ", r: "Đại từ", m: "Số từ", q: "Lượng từ",
  p: "Giới từ", c: "Liên từ", u: "Trợ từ", t: "Từ chỉ thời gian", f: "Từ chỉ phương hướng",
  e: "Thán từ", x: "Cụm từ", z: "Danh từ riêng",
};

/** Chuẩn hoá về "HSK n". Chấp nhận "HSK 1", "HSK1", "hsk 1", "1". Trả null nếu không phải HSK 1-6. */
export function parseHskLevel(input: string | number | undefined | null): number | null {
  if (input === undefined || input === null) return null;
  const m = String(input).trim().match(/^(?:hsk)?\s*([1-6])$/i);
  return m ? Number(m[1]) : null;
}

export const formatHskLevel = (n: number) => `HSK ${n}`;

/** Dữ liệu cũ lưu "HSK1", dữ liệu mới "HSK 1" → truy vấn cả hai dạng. */
export function levelVariants(n: number): string[] {
  return [`HSK ${n}`, `HSK${n}`];
}

export function bandOfLevel(n: number): BandKey | null {
  return LEARNER_BANDS.find((b) => b.levels.includes(n))?.key ?? null;
}
