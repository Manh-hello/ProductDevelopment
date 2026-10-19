/** Chủ đề tạo câu: `key` gửi từ client, `label` dùng trong prompt và để khớp với thẻ (tag) của từ vựng. */
export const SENTENCE_TOPICS = [
  { key: "school", label: "Trường học" },
  { key: "family", label: "Gia đình" },
  { key: "food", label: "Ăn uống" },
  { key: "shopping", label: "Mua sắm" },
  { key: "time", label: "Thời gian" },
  { key: "work", label: "Công việc" },
  { key: "daily", label: "Giao tiếp hằng ngày" },
] as const;

export const SENTENCE_TOPIC_KEYS = SENTENCE_TOPICS.map((t) => t.key) as [string, ...string[]];

export const topicLabel = (key: string): string => SENTENCE_TOPICS.find((t) => t.key === key)?.label ?? key;

export const HSK_LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"] as const;
