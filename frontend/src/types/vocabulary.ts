export type VocabularyStatus = "new" | "learning" | "mastered";

export interface Vocabulary {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  example?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
  notes?: string;
  status: VocabularyStatus;
  learnedAt?: string; // ISO date
  nextReviewAt?: string; // ISO date
}

export type ReviewRating = "again" | "hard" | "good" | "easy";

export interface ExerciseQuestion {
  id: string;
  hanzi: string;
  pinyin: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}
