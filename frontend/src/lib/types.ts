/** Kiểu dữ liệu trả về từ backend (khớp docs/api.md). */

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  dailyGoal: number;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  createdAt: string;
  settings: Record<string, string | number | boolean | null> | null;
}

export interface Example {
  id?: string;
  sentenceHanzi: string;
  sentencePinyin: string;
  sentenceMeaning: string;
  audioUrl?: string | null;
}

export interface Vocabulary {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  pronunciation: string | null;
  audioUrl: string | null;
  level: string | null;
  partOfSpeech: string | null;
  notes: string | null;
  examples: Example[];
  tags: string[];
}

export type WordState = 'new' | 'learning' | 'due' | 'mastered';

export interface UserVocabulary {
  id: string;
  vocabularyId: string;
  status: string;
  state: WordState;
  isWeak: boolean;
  masteryLevel: number;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number | null;
  intervalDays: number | null;
  nextReviewAt: string | null;
  lastReviewedAt: string | null;
  note: string | null;
  mnemonic: string | null;
  vocabulary: Vocabulary;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UserVocabularyList {
  items: UserVocabulary[];
  pagination: Pagination;
  counts: { all: number; new: number; learning: number; due: number; mastered: number; weak: number };
}

export interface SkillScore {
  key: string;
  label: string;
  accuracy: number | null;
  attempts: number;
}

export interface DashboardSummary {
  xp: number;
  level: number;
  levelTitle: string;
  xpIntoLevel: number;
  xpPerLevel: number;
  dailyGoal: number;
  currentStreak: number;
  longestStreak: number;
  totalWords: number;
  masteredWords: number;
  learningWords: number;
  newWords: number;
  dueWords: number;
  wordsLearnedToday: number;
  wordsReviewedToday: number;
  accuracyToday: number | null;
  unreadNotifications: number;
}

export interface WeakWord {
  id: string;
  incorrectCount: number;
  correctCount: number;
  vocabulary: Vocabulary;
}

export interface DailyActivity {
  date: string;
  wordsReviewed: number;
  xpEarned: number;
}

export interface DailyChallenge {
  bonusXp: number;
  tasks: { key: string; label: string; target: number; current: number; done: boolean; link: string }[];
  completedItems: number;
  totalItems: number;
  allDone: boolean;
  claimed: boolean;
  hoursLeft: number;
}

export type InputMode = 'choice' | 'text' | 'order' | 'self' | 'flashcard';

export interface Question {
  vocabularyId: string;
  exerciseId: string;
  exerciseType: string;
  inputMode: InputMode;
  prompt: string;
  display: {
    hanzi?: string;
    pinyin?: string;
    meaning?: string;
    sentence?: string;
    sentenceMeaning?: string;
    audioText?: string;
  };
  options: string[];
  tokens?: string[];
  exampleId?: string;
  hint?: string;
  reveal?: {
    hanzi: string;
    pinyin: string;
    meaning: string;
    level: string | null;
    partOfSpeech: string | null;
    example: { hanzi: string; pinyin: string; meaning: string } | null;
    reviewCount: number;
    accuracy: number | null;
    masteryLevel: number;
    preview?: { again: number; hard: number; good: number; easy: number };
  };
}

export interface StartedSession {
  sessionId: string;
  sessionType: string;
  composition: { newWords: number; dueWords: number; weakWords: number };
  questions: Question[];
}

export interface UnlockedAchievement {
  code: string;
  name: string;
  icon: string | null;
  xpReward: number;
}

export interface AnswerResult {
  attemptId: string;
  isCorrect: boolean;
  correctAnswer: string;
  feedback: string | null;
  xpAwarded: number;
  quality: number;
  intervalDays: number;
  nextReviewAt: string;
  masteryLevel: number;
  status: string;
  currentStreak: number;
  newAchievements: UnlockedAchievement[];
}

export interface SessionCompletion {
  sessionId: string;
  sessionType: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracy: number | null;
  xpEarned: number;
  completionBonus: number;
  durationSeconds: number;
  newAchievements: UnlockedAchievement[];
}

export interface SessionSummary {
  session: { id: string; sessionType: string; sessionNumber: number; totalQuestions: number; correctAnswers: number; xpEarned: number; startedAt: string; completedAt: string | null };
  stats: { answered: number; correct: number; incorrect: number; accuracy: number | null; avgResponseMs: number | null; durationSeconds: number };
  attempts: { vocabularyId: string; exerciseType: string; hanzi: string; pinyin: string; meaning: string; userAnswer: string; isCorrect: boolean; responseTimeMs: number | null }[];
  wrongWords: { vocabularyId: string; hanzi: string; pinyin: string; meaning: string; exerciseType: string; incorrectCount: number }[];
  promoted: { vocabularyId: string; hanzi: string; pinyin: string }[];
  user: { currentStreak: number; longestStreak: number; totalXp: number };
  distribution: { new: number; learning: number; mastered: number; total: number };
}

export interface ReviewForecast {
  dueNow: number;
  days: { date: string; count: number }[];
  buckets: { apprentice: number; proficient: number; expert: number; mastered: number };
  nextReviewAt: string | null;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  xpReward: number;
  group: string;
  rarity: 'common' | 'rare';
  unlocked: boolean;
  earnedAt: string | null;
  progress: { current: number; target: number };
}

export interface AppNotification {
  id: string;
  category: 'srs' | 'achievement' | 'ai' | 'system';
  title: string;
  body: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationList {
  items: AppNotification[];
  counts: Record<string, number>;
  unreadTotal: number;
}

export interface StatisticsOverview {
  range: string;
  from: string;
  to: string;
  totals: { newWords: number; reviewed: number; correct: number; incorrect: number; studyMinutes: number; xp: number; accuracy: number | null; answered: number; activeDays: number; avgMinutesPerActiveDay: number };
  previous: { newWords: number; accuracy: number | null; studyMinutes: number };
  series: { date: string; wordsLearned: number; wordsReviewed: number; xpEarned: number; studyMinutes: number; accuracy: number | null }[];
  vocabulary: { total: number; mastered: number; learning: number; new: number; due: number };
  skills: SkillScore[];
  retention: number | null;
  topErrors: { vocabularyId: string; hanzi: string; pinyin: string; meaning: string; incorrectCount: number; accuracy: number }[];
  user: { totalXp: number; currentStreak: number; longestStreak: number };
}

export interface VocabularyProgress {
  inMyList: boolean;
  /** Được sửa bản gốc dùng chung? (false khi đang có người dùng khác học từ này). */
  canEditShared: boolean;
  otherLearners: number;
  userVocabulary: (Omit<UserVocabulary, 'vocabulary'> & { retention: number }) | null;
  skills: SkillScore[];
  history: { id: string; quality: number; newInterval: number; reviewedAt: string; nextReviewAt: string }[];
  sentences: UserSentence[];
}

export type SentenceSourceKind = 'manual' | 'ai' | 'existing';

export interface UsedWord {
  vocabularyId: string;
  hanzi: string;
  role: 'target' | 'known';
}

export interface UserSentence {
  id: string;
  vocabularyId: string;
  sentence: string;
  pinyin: string | null;
  correction: string | null;
  status: 'pending' | 'reviewed';
  /** Bản dịch tiếng Việt - có giá trị thì câu dùng được cho các bài Dịch/Điền từ/Sắp xếp. */
  translation: string | null;
  explanation: string | null;
  topic: string | null;
  /** Trình độ ƯỚC LƯỢNG, không phải dữ liệu đã xác minh. */
  level: string | null;
  source: SentenceSourceKind;
  usedWords: UsedWord[] | null;
  createdAt: string;
  vocabulary?: Vocabulary;
}

// ---------- AI: gợi ý từ vựng ----------
export type DataSource = 'database' | 'pinyin-library' | 'ai';

export interface SuggestedExample {
  sentenceHanzi: string;
  sentencePinyin: string;
  sentenceMeaning: string;
  explanation: string | null;
  source: 'database' | 'ai';
}

export interface WordSuggestion {
  hanzi: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string | null;
  level: string | null;
  notes: string | null;
  examples: SuggestedExample[];
  alternativeReadings: { pinyin: string; meaning: string | null; source: DataSource }[];
  aiMeaning: string | null;
  sources: { pinyin: DataSource; meaning: DataSource; level: DataSource | null; examples: 'database' | 'ai' | 'mixed' | 'none' };
}

export interface WordLookupResult {
  input: string;
  inputType: 'word' | 'phrase';
  existing: { items: (Vocabulary & { inMyList: boolean })[]; exactMatch: boolean };
  suggestion: WordSuggestion;
  ai: { status: 'ok' | 'skipped' | 'unavailable' | 'error'; message: string | null; cached: boolean };
  aiGenerated: boolean;
  warnings: string[];
}

// ---------- AI: tạo câu ----------
export type SentenceMode = 'new_word' | 'review_mix' | 'topic' | 'level' | 'selected_words';

export interface GeneratedSentence {
  /** Khoá tạm của giao diện - câu CHƯA được lưu vào database. */
  tempId: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  explanation: string | null;
  usedWords: UsedWord[];
  primaryVocabularyId: string;
  topic: string | null;
  level: string | null;
  source: 'ai' | 'existing';
}

export interface GenerateSentencesResult {
  mode: SentenceMode;
  sentences: GeneratedSentence[];
  targets: { vocabularyId: string; hanzi: string; pinyin: string; meaning: string }[];
  levelEstimated: true;
  usedFallback: boolean;
  ai: { status: 'ok' | 'fallback'; message: string | null };
  warnings: string[];
  generatedAt: string;
}
