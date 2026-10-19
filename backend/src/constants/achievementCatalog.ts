/**
 * Catalog thành tích: metadata (lưu DB qua seed) + điều kiện/tiến độ (giữ trong code,
 * vì bảng `achievements` theo ERD không có cột condition).
 * `metric` ↔ AchievementStats ở services/achievement.service.ts.
 */
export type AchievementMetric =
  | "wordsLearned"
  | "wordsMastered"
  | "currentStreak"
  | "totalXp"
  | "sentencesWritten"
  | "perfectSessions"
  | "sessionsCompleted"
  | "listeningAttempts"
  | "speakingAttempts"
  | "writingAttempts"
  | "dailyChallenges";

export interface AchievementDef {
  code: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  metric: AchievementMetric;
  target: number;
  /** Nhóm hiển thị ở trang Thành tích. */
  group: "vocabulary" | "streak" | "practice" | "skills";
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { code: "WORDS_10", name: "Khởi đầu hành trình", description: "Học đúng 10 từ vựng đầu tiên", icon: "flag", xpReward: 50, metric: "wordsLearned", target: 10, group: "vocabulary" },
  { code: "WORDS_50", name: "Người kiên trì", description: "Học đúng 50 từ vựng", icon: "military_tech", xpReward: 150, metric: "wordsLearned", target: 50, group: "vocabulary" },
  { code: "WORDS_100", name: "Bậc thầy từ vựng", description: "Học đúng 100 từ vựng", icon: "workspace_premium", xpReward: 300, metric: "wordsLearned", target: 100, group: "vocabulary" },
  { code: "WORDS_250", name: "Kho tàng Hán tự", description: "Học đúng 250 từ vựng", icon: "auto_stories", xpReward: 500, metric: "wordsLearned", target: 250, group: "vocabulary" },
  { code: "WORDS_500", name: "Thông thái", description: "Học đúng 500 từ vựng", icon: "school", xpReward: 1000, metric: "wordsLearned", target: 500, group: "vocabulary" },
  { code: "MASTERED_10", name: "Khắc cốt ghi tâm", description: "Đưa 10 từ lên mức Mastered", icon: "verified", xpReward: 150, metric: "wordsMastered", target: 10, group: "vocabulary" },
  { code: "MASTERED_50", name: "Trí nhớ bền vững", description: "Đưa 50 từ lên mức Mastered", icon: "psychology", xpReward: 400, metric: "wordsMastered", target: 50, group: "vocabulary" },
  { code: "STREAK_3", name: "Khởi động nhiệt huyết", description: "Duy trì chuỗi học 3 ngày liên tiếp", icon: "whatshot", xpReward: 30, metric: "currentStreak", target: 3, group: "streak" },
  { code: "STREAK_7", name: "Một tuần bền bỉ", description: "Duy trì chuỗi học 7 ngày liên tiếp", icon: "local_fire_department", xpReward: 100, metric: "currentStreak", target: 7, group: "streak" },
  { code: "STREAK_30", name: "Kỷ luật thép", description: "Duy trì chuỗi học 30 ngày liên tiếp", icon: "bolt", xpReward: 500, metric: "currentStreak", target: 30, group: "streak" },
  { code: "STREAK_100", name: "Bách nhật tinh tấn", description: "Duy trì chuỗi học 100 ngày liên tiếp", icon: "diamond", xpReward: 2000, metric: "currentStreak", target: 100, group: "streak" },
  { code: "SESSIONS_10", name: "Chăm chỉ luyện tập", description: "Hoàn thành 10 phiên luyện tập", icon: "model_training", xpReward: 100, metric: "sessionsCompleted", target: 10, group: "practice" },
  { code: "SESSIONS_50", name: "Thói quen vàng", description: "Hoàn thành 50 phiên luyện tập", icon: "event_repeat", xpReward: 400, metric: "sessionsCompleted", target: 50, group: "practice" },
  { code: "PERFECT_SESSION", name: "Hoàn hảo", description: "Hoàn thành một phiên (từ 5 câu) với 100% chính xác", icon: "stars", xpReward: 100, metric: "perfectSessions", target: 1, group: "practice" },
  { code: "DAILY_CHALLENGE_1", name: "Chiến binh thử thách", description: "Hoàn thành Thử Thách Hôm Nay lần đầu", icon: "emoji_events", xpReward: 100, metric: "dailyChallenges", target: 1, group: "practice" },
  { code: "XP_1000", name: "Nghìn điểm công lực", description: "Tích lũy 1.000 XP", icon: "bolt", xpReward: 100, metric: "totalXp", target: 1000, group: "practice" },
  { code: "XP_5000", name: "Đại cao thủ", description: "Tích lũy 5.000 XP", icon: "military_tech", xpReward: 500, metric: "totalXp", target: 5000, group: "practice" },
  { code: "SENTENCES_10", name: "Người kể chuyện", description: "Tự đặt 10 câu với từ vựng", icon: "edit_note", xpReward: 150, metric: "sentencesWritten", target: 10, group: "skills" },
  { code: "LISTENING_50", name: "Đôi tai tinh tường", description: "Hoàn thành 50 bài nghe", icon: "headphones", xpReward: 200, metric: "listeningAttempts", target: 50, group: "skills" },
  { code: "SPEAKING_30", name: "Giọng nói tự tin", description: "Hoàn thành 30 bài luyện nói", icon: "record_voice_over", xpReward: 200, metric: "speakingAttempts", target: 30, group: "skills" },
  { code: "WRITING_50", name: "Bậc thầy nét bút", description: "Hoàn thành 50 bài luyện viết", icon: "draw", xpReward: 300, metric: "writingAttempts", target: 50, group: "skills" },
];

/** Thành tích có xpReward >= ngưỡng này được gắn nhãn "hiếm". */
export const RARE_XP_THRESHOLD = 400;
