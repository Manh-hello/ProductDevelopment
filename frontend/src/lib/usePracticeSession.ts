import { useCallback, useEffect, useRef, useState } from 'react';
import { practiceApi } from '../api';
import type { CatalogScope } from '../api';
import { ApiError } from './api';
import { useAuth } from './auth';
import type { AnswerResult, Question, SessionCompletion, StartedSession } from './types';

export interface PracticeConfig {
  sessionType: 'mixed' | 'daily_review' | 'practice';
  exerciseTypes?: string[];
  size?: number;
  /** `saved`: luyện từ các câu đã lưu (có bản dịch) của bạn. */
  sentenceSource?: 'saved';
  /** Chỉ luyện các từ đã thêm thuộc bộ này (cấp độ HSK / chủ đề / trình độ). */
  scope?: CatalogScope;
}

export type Phase = 'loading' | 'error' | 'question' | 'feedback' | 'finishing';

export interface AnswerPayload {
  selectedAnswer?: string;
  quality?: number;
}

/**
 * Máy trạng thái của một phiên luyện tập: tạo phiên → hiển thị từng câu → gửi đáp án (server chấm)
 * → xem phản hồi → câu kế tiếp → hoàn thành phiên.
 */
export default function usePracticeSession(config: PracticeConfig) {
  const { refreshSummary } = useAuth();
  const [session, setSession] = useState<StartedSession | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const shownAt = useRef(Date.now());
  const startedAt = useRef(Date.now());
  const started = useRef(false);

  const start = useCallback(async () => {
    setPhase('loading');
    setError(null);
    try {
      const s = await practiceApi.start({ sessionType: config.sessionType, sessionSize: config.size, exerciseTypes: config.exerciseTypes, sentenceSource: config.sentenceSource, scope: config.scope });
      setSession(s);
      setIndex(0);
      setResult(null);
      setCorrectStreak(0);
      setXp(0);
      startedAt.current = Date.now();
      shownAt.current = Date.now();
      setPhase('question');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không thể bắt đầu phiên luyện tập.');
      setPhase('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.sessionType, config.size, config.sentenceSource, JSON.stringify(config.exerciseTypes), JSON.stringify(config.scope)]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void start();
  }, [start]);

  useEffect(() => {
    if (phase === 'loading' || phase === 'error' || phase === 'finishing') return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const question: Question | null = session?.questions[index] ?? null;
  const total = session?.questions.length ?? 0;

  const submit = useCallback(
    async (payload: AnswerPayload) => {
      if (!session || !question || submitting || phase !== 'question') return;
      setSubmitting(true);
      try {
        const res = await practiceApi.answer(session.sessionId, {
          vocabularyId: question.vocabularyId,
          exerciseType: question.exerciseType,
          exampleId: question.exampleId,
          responseTimeMs: Math.max(1, Date.now() - shownAt.current),
          ...payload,
        });
        setResult(res);
        setXp((x) => x + res.xpAwarded);
        setCorrectStreak((c) => (res.isCorrect ? c + 1 : 0));
        setPhase('feedback');
        void refreshSummary();
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'Không gửi được đáp án.');
      } finally {
        setSubmitting(false);
      }
    },
    [session, question, submitting, phase, refreshSummary]
  );

  /** Sang câu kế tiếp; nếu đã hết câu thì hoàn thành phiên và trả về kết quả tổng kết. */
  const next = useCallback(async (): Promise<SessionCompletion | null> => {
    if (!session) return null;
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setResult(null);
      setError(null);
      shownAt.current = Date.now();
      setPhase('question');
      return null;
    }
    setPhase('finishing');
    try {
      const done = await practiceApi.complete(session.sessionId);
      void refreshSummary();
      return done;
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không hoàn thành được phiên.');
      setPhase('error');
      return null;
    }
  }, [session, index, total, refreshSummary]);

  return { session, question, index, total, phase, error, result, submitting, correctStreak, xp, elapsed, submit, next, restart: start };
}
