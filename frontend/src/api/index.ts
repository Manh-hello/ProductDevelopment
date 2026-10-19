import { del, get, patch, post, put } from '../lib/api';
import type {
  Achievement, AnswerResult, DailyActivity, DailyChallenge, DashboardSummary, NotificationList, Question, ReviewForecast,
  SessionCompletion, SessionSummary, SkillScore, StartedSession, StatisticsOverview, User, UserSentence, UserVocabulary,
  UserVocabularyList, Vocabulary, VocabularyProgress, WeakWord, AppNotification, Example,
  GenerateSentencesResult, SentenceMode, UsedWord, WordLookupResult,
} from '../lib/types';

export const authApi = {
  login: (email: string, password: string) => post<{ user: User; token: string }>('/auth/login', { email, password }),
  register: (body: { name: string; email: string; password: string; dailyGoal?: number; level?: string }) =>
    post<{ user: User; token: string }>('/auth/register', body),
  me: () => get<User>('/auth/me'),
  updateMe: (body: { displayName?: string; avatarUrl?: string | null; dailyGoal?: number; settings?: Record<string, string | number | boolean | null> }) =>
    put<User>('/auth/me', body),
  changePassword: (currentPassword: string, newPassword: string) => put<{ changed: boolean }>('/auth/password', { currentPassword, newPassword }),
  deleteAccount: (password: string) => del<{ deleted: boolean }>('/auth/me', { password }),
  exportData: () => get<unknown>('/auth/export'),
};

export interface NewVocabularyInput {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level?: string;
  partOfSpeech?: string;
  notes?: string;
  examples?: Example[];
  tags?: string[];
  addToMyList?: boolean;
  initialStage?: 'new' | 'learning' | 'familiar';
  reviewNow?: boolean;
}

export const vocabularyApi = {
  get: (id: string) => get<Vocabulary>(`/vocabularies/${id}`),
  progress: (id: string) => get<VocabularyProgress>(`/vocabularies/${id}/progress`),
  create: (body: NewVocabularyInput) => post<Vocabulary & { userVocabulary: UserVocabulary | null }>('/vocabularies', body),
  update: (id: string, body: Partial<Omit<NewVocabularyInput, 'addToMyList' | 'initialStage' | 'reviewNow'>>) => put<Vocabulary>(`/vocabularies/${id}`, body),
  lookup: (q: string) => get<{ items: (Vocabulary & { inMyList: boolean })[]; exactMatch: boolean }>('/vocabularies/lookup', { q }),
  /** Gợi ý dữ liệu từ bằng AI. Chỉ trả gợi ý, KHÔNG ghi database. */
  aiLookup: (body: { text: string; focus?: 'all' | 'examples'; avoidSentences?: string[]; force?: boolean }) => post<WordLookupResult>('/vocabularies/ai-lookup', body),
  tags: () => get<{ id: string; name: string }[]>('/tags'),
};

export const myWordsApi = {
  list: (q: { filter?: string; search?: string; page?: number; limit?: number } = {}) => get<UserVocabularyList>('/user-vocabularies', q),
  add: (vocabularyId: string) => post<UserVocabulary>(`/user-vocabularies/${vocabularyId}`),
  update: (vocabularyId: string, body: { note?: string | null; mnemonic?: string | null; resetProgress?: boolean }) =>
    patch<UserVocabulary>(`/user-vocabularies/${vocabularyId}`, body),
  remove: (vocabularyId: string) => del<{ vocabularyId: string }>(`/user-vocabularies/${vocabularyId}`),
};

export const practiceApi = {
  start: (body: { sessionType?: 'mixed' | 'daily_review' | 'practice'; sessionSize?: number; exerciseTypes?: string[]; sentenceSource?: 'saved' }) =>
    post<StartedSession>('/practice/sessions', body),
  answer: (
    sessionId: string,
    body: { vocabularyId: string; exerciseType: string; selectedAnswer?: string; exampleId?: string; quality?: number; responseTimeMs?: number }
  ) => post<AnswerResult>(`/practice/sessions/${sessionId}/answers`, body),
  complete: (sessionId: string) => put<SessionCompletion>(`/practice/sessions/${sessionId}/complete`),
  summary: (sessionId: string) => get<SessionSummary>(`/practice/sessions/${sessionId}`),
};

export const dashboardApi = {
  summary: () => get<DashboardSummary>('/dashboard/summary'),
  weakWords: () => get<WeakWord[]>('/dashboard/weak-words'),
  weekly: () => get<DailyActivity[]>('/dashboard/weekly-activity'),
  skills: () => get<SkillScore[]>('/dashboard/skills'),
  growth: () => get<{ series: { date: string; added: number; total: number }[]; addedInRange: number }>('/dashboard/vocabulary-growth'),
  challenge: () => get<DailyChallenge>('/dashboard/daily-challenge'),
  claimChallenge: () => post<{ xpAwarded: number }>('/dashboard/daily-challenge/claim'),
  forecast: () => get<ReviewForecast>('/dashboard/review-forecast'),
};

export type PinyinStyle = 'word' | 'sentence';

export const pinyinApi = {
  /** Hán tự / Pinyin số thanh (lao3shi1) → Pinyin có dấu (lǎoshī). */
  convert: (text: string, style: PinyinStyle = 'word') =>
    post<{ input: string; pinyin: string; hadHanzi: boolean; hadToneNumbers: boolean }>('/pinyin/convert', { text, style }),
};

export const statsApi = { overview: (range: string) => get<StatisticsOverview>('/statistics/overview', { range }) };
export const achievementsApi = { list: () => get<Achievement[]>('/achievements') };

export const notificationsApi = {
  list: (q: { category?: string; unread?: boolean; limit?: number } = {}) => get<NotificationList>('/notifications', { ...q, unread: q.unread ? 'true' : undefined }),
  markRead: (id: string) => patch<AppNotification>(`/notifications/${id}/read`),
  markAllRead: (category?: string) => post<{ updated: number }>(`/notifications/read-all${category ? `?category=${category}` : ''}`),
  remove: (id: string) => del<{ id: string }>(`/notifications/${id}`),
};

export const sentencesApi = {
  list: (vocabularyId?: string) => get<UserSentence[]>('/user-sentences', { vocabularyId }),
  create: (body: {
    vocabularyId: string; sentence: string; pinyin?: string;
    translation?: string; explanation?: string; topic?: string; level?: string;
    source?: 'manual' | 'ai' | 'existing'; usedWords?: Pick<UsedWord, 'vocabularyId' | 'role'>[];
  }) => post<UserSentence>('/user-sentences', body),
  /** Xem trước câu sinh từ vốn từ của bạn. KHÔNG ghi database - dùng `create` để lưu. */
  generate: (body: {
    mode: SentenceMode; count?: number; vocabularyId?: string; vocabularyIds?: string[]; topic?: string; level?: string;
  }) => post<GenerateSentencesResult>('/user-sentences/generate', body),
  remove: (id: string) => del<{ id: string }>(`/user-sentences/${id}`),
};

export type { Question };
