import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../../layouts/AppShell';
import { speak } from '../../lib/speak';
import usePracticeSession from '../../lib/usePracticeSession';
import type { PracticeConfig } from '../../lib/usePracticeSession';
import type { Question } from '../../lib/types';
import { ErrorBox } from '../PageState';
import { PageLoading } from '../../lib/auth';
import DrawPad from './DrawPad';

interface Props extends PracticeConfig {
  /** Nhãn nhỏ bên trái (vd "HSK • Trắc nghiệm"). */
  badge: string;
  title: string;
  /** Trang đích khi hoàn thành (nhận ?session=<id>). */
  resultPath?: string;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const RATINGS = [
  { key: 'again', label: 'Lặp lại', en: 'Again', quality: 1, tone: 'bg-error-container text-on-error-container' },
  { key: 'hard', label: 'Khó', en: 'Hard', quality: 3, tone: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  { key: 'good', label: 'Nhớ tốt', en: 'Good', quality: 4, tone: 'bg-secondary-container text-on-secondary-container' },
  { key: 'easy', label: 'Rất dễ', en: 'Easy', quality: 5, tone: 'bg-primary-fixed text-on-primary-fixed' },
] as const;

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const isTypingTarget = () => ['input', 'textarea'].includes((document.activeElement?.tagName ?? '').toLowerCase());

export default function PracticeRunner({ badge, title, resultPath = '/practice/result', ...config }: Props) {
  const navigate = useNavigate();
  const s = usePracticeSession(config);
  const { question: q, phase, result } = s;

  // Trạng thái nhập liệu của câu hiện tại
  const [picked, setPicked] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [order, setOrder] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [transcript, setTranscript] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPicked(null);
    setText('');
    setOrder([]);
    setRevealed(false);
    setTranscript('');
    if (q?.display.audioText && q.inputMode !== 'flashcard') speak(q.display.audioText);
    if (q?.inputMode === 'text') setTimeout(() => inputRef.current?.focus(), 50);
  }, [q?.vocabularyId, q?.exerciseType]);

  const finish = async () => {
    const done = await s.next();
    if (done) navigate(`${resultPath}?session=${done.sessionId}`, { replace: true });
  };

  const submitCurrent = () => {
    if (!q || phase !== 'question') return;
    if (q.inputMode === 'choice' && picked) void s.submit({ selectedAnswer: picked });
    else if (q.inputMode === 'text' && text.trim()) void s.submit({ selectedAnswer: text.trim() });
    else if (q.inputMode === 'order' && order.length > 0) void s.submit({ selectedAnswer: order.map((i) => q.tokens![i]).join('') });
  };

  // Phím tắt
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q) return;
      if (phase === 'feedback' && e.key === 'Enter') {
        e.preventDefault();
        void finish();
        return;
      }
      if (phase !== 'question') return;
      if (e.key === 'Enter' && q.inputMode !== 'flashcard' && q.inputMode !== 'self') {
        e.preventDefault();
        submitCurrent();
      } else if (isTypingTarget()) {
        return;
      } else if (q.inputMode === 'choice') {
        const idx = ['a', 'b', 'c', 'd'].indexOf(e.key.toLowerCase());
        const num = Number(e.key) - 1;
        const i = idx >= 0 ? idx : num >= 0 && num < 4 ? num : -1;
        if (i >= 0 && q.options[i]) setPicked(q.options[i]);
      } else if (e.code === 'Space' && (q.inputMode === 'flashcard' || q.inputMode === 'self')) {
        e.preventDefault();
        setRevealed((v) => !v);
      } else if (revealed && (q.inputMode === 'flashcard' || q.inputMode === 'self') && ['1', '2', '3', '4'].includes(e.key)) {
        void s.submit({ quality: RATINGS[Number(e.key) - 1].quality });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const progress = s.total > 0 ? ((s.index + (phase === 'feedback' ? 1 : 0)) / s.total) * 100 : 0;

  if (phase === 'loading') return <AppShell><PageLoading label="Đang chuẩn bị phiên luyện tập..." /></AppShell>;
  if (phase === 'error' && !s.session) {
    const noWords = s.error?.includes('Chưa có từ vựng');
    return (
      <AppShell>
        <div className="max-w-xl mx-auto">
          <ErrorBox message={s.error ?? 'Lỗi'} onRetry={noWords ? undefined : s.restart} />
          {noWords && (
            <div className="flex justify-center gap-space-sm">
              <Link to="/vocabulary/new" className="px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm">Thêm từ vựng mới</Link>
              <Link to="/vocabulary" className="px-space-md py-2.5 rounded-lg bg-surface-container font-title-sm">Về kho từ vựng</Link>
            </div>
          )}
        </div>
      </AppShell>
    );
  }
  if (!q) return <AppShell><PageLoading label="Đang hoàn tất phiên..." /></AppShell>;

  return (
    <AppShell>
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-space-lg pb-space-xl">
        {/* Thanh trạng thái */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> {badge}
              </span>
              <span className="text-on-surface-variant font-label-md text-label-md">/</span>
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">{title}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[18px] text-tertiary">local_fire_department</span>
                <span>{s.correctStreak} Đúng Liên Tiếp</span>
                <span className="text-tertiary font-bold text-label-sm">(+{s.xp} XP)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container text-on-surface font-title-sm text-title-sm">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">timer</span>
                <span className="font-mono font-bold tracking-tight">{fmt(s.elapsed)}</span>
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
                title="Thoát phiên luyện tập"
                type="button"
                onClick={() => navigate('/practice')}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-space-md pt-1">
            <div className="flex-1 w-full h-2 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex items-baseline gap-1 shrink-0 font-label-sm text-label-sm text-on-surface-variant">
              <span>Tiến độ:</span>
              <span className="font-bold text-on-surface text-label-md">{String(s.index + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{s.total} Câu</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <PromptCard q={q} revealed={revealed || phase === 'feedback'} />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {q.inputMode === 'choice' && (
              <div className="grid grid-cols-1 gap-space-sm">
                {q.options.map((opt, i) => {
                  const answered = phase === 'feedback';
                  const isCorrect = answered && opt === result?.correctAnswer;
                  const isWrongPick = answered && opt === picked && !result?.isCorrect;
                  const tone = isCorrect
                    ? 'bg-secondary-container text-on-secondary-container'
                    : isWrongPick
                      ? 'bg-error-container text-on-error-container'
                      : picked === opt
                        ? 'bg-primary-fixed/40'
                        : 'bg-surface-container-lowest hover:bg-surface-container-low';
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={answered || s.submitting}
                      onClick={() => setPicked(opt)}
                      className={`group relative w-full text-left p-space-md rounded-xl shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition-all flex items-center justify-between ${tone}`}
                    >
                      <div className="flex items-center gap-space-md">
                        <span className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant font-title-sm text-title-sm flex items-center justify-center font-bold">
                          {isCorrect ? <span className="material-symbols-outlined text-[18px]">check</span> : isWrongPick ? <span className="material-symbols-outlined text-[18px]">close</span> : LETTERS[i]}
                        </span>
                        <span className={`${/[\u3400-\u9fff]/.test(opt) ? 'font-display-character text-[28px]' : 'font-title-sm text-title-sm'} text-on-surface font-semibold`}>{opt}</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant/60 font-mono tracking-wider">[Phím {LETTERS[i]}]</span>
                    </button>
                  );
                })}
              </div>
            )}

            {q.inputMode === 'text' && (
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm">
                <input
                  ref={inputRef}
                  value={text}
                  disabled={phase !== 'question'}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={q.exerciseType === 'DICTATION' ? 'Gõ chữ Hán hoặc Pinyin...' : 'Nhập câu trả lời của bạn...'}
                  className="w-full bg-surface-container-low rounded-xl px-4 py-3 font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-fixed-dim"
                  lang="zh"
                />
                {q.hint && <p className="font-label-sm text-label-sm text-on-surface-variant">Gợi ý: {q.hint}</p>}
              </div>
            )}

            {q.inputMode === 'order' && q.tokens && (
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="min-h-[64px] rounded-xl bg-surface-container-low p-space-sm flex flex-wrap gap-2 items-center">
                  {order.length === 0 && <span className="text-on-surface-variant font-body-sm px-2">Chạm vào các mảnh bên dưới để ghép câu...</span>}
                  {order.map((ti, pos) => (
                    <button key={pos} type="button" disabled={phase !== 'question'} onClick={() => setOrder((o) => o.filter((_, p) => p !== pos))} className="px-3 py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-display-character text-[24px]">
                      {q.tokens![ti]}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {q.tokens.map((t, i) => (
                    <button key={i} type="button" disabled={order.includes(i) || phase !== 'question'} onClick={() => setOrder((o) => [...o, i])} className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high disabled:opacity-30 font-display-character text-[24px]">
                      {t}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setOrder([])} className="self-start px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span> Tạo lại
                </button>
              </div>
            )}

            {(q.inputMode === 'self' || q.inputMode === 'flashcard') && phase === 'question' && (
              <SelfView q={q} revealed={revealed} setRevealed={setRevealed} transcript={transcript} setTranscript={setTranscript} onRate={(quality) => s.submit({ quality })} busy={s.submitting} />
            )}

            {s.error && phase === 'question' && <p role="alert" className="rounded-lg bg-error-container text-on-error-container px-space-md py-2 font-body-sm">{s.error}</p>}

            {/* Phản hồi */}
            {phase === 'feedback' && result && (
              <div className={`w-full rounded-2xl p-space-lg shadow-[0_8px_24px_rgba(15,23,42,0.05)] flex flex-col gap-space-sm ${result.isCorrect ? 'bg-secondary-fixed/40' : 'bg-error-container/60'}`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${result.isCorrect ? 'text-secondary' : 'text-error'}`}>{result.isCorrect ? 'thumb_up' : 'sentiment_dissatisfied'}</span>
                    <span className={`font-title-sm text-title-sm font-bold ${result.isCorrect ? 'text-secondary' : 'text-error'}`}>
                      {result.isCorrect ? `Chính xác! +${result.xpAwarded} XP` : 'Chưa chính xác'}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> Ôn lại sau {result.intervalDays} ngày • Thuần thục {result.masteryLevel}/5
                  </span>
                </div>
                {q.inputMode !== 'self' && q.inputMode !== 'flashcard' && (
                  <p className="font-body-md text-on-surface">
                    Đáp án đúng: <strong className="font-display-character text-[22px]">{result.correctAnswer}</strong>
                  </p>
                )}
                {result.feedback && <p className="font-body-sm text-on-surface-variant">{result.feedback}</p>}
                {result.newAchievements.map((a) => (
                  <p key={a.code} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-md font-bold">
                    <span className="material-symbols-outlined text-[18px]">emoji_events</span> Mở khoá thành tích: {a.name} (+{a.xpReward} XP)
                  </p>
                ))}
              </div>
            )}

            {/* Điều khiển */}
            <div className="w-full flex items-center justify-between gap-space-sm flex-wrap">
              <div className="font-label-sm text-label-sm text-on-surface-variant">
                {q.inputMode === 'choice' && 'Phím A-D hoặc 1-4 để chọn • Enter để xác nhận'}
                {(q.inputMode === 'flashcard' || q.inputMode === 'self') && 'Space để lật • 1-4 để đánh giá'}
                {(q.inputMode === 'text' || q.inputMode === 'order') && 'Enter để xác nhận'}
              </div>
              <div className="flex gap-space-sm">
                {q.display.audioText && (
                  <button type="button" onClick={() => speak(q.display.audioText!)} className="px-3.5 py-2.5 rounded-lg bg-surface-container text-on-surface-variant font-title-sm inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">volume_up</span> <span className="hidden sm:inline">Nghe lại</span>
                  </button>
                )}
                {phase === 'question' && q.inputMode !== 'self' && q.inputMode !== 'flashcard' && (
                  <button
                    type="button"
                    onClick={submitCurrent}
                    disabled={s.submitting || (q.inputMode === 'choice' ? !picked : q.inputMode === 'text' ? !text.trim() : order.length === 0)}
                    className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm font-bold shadow-[0_4px_14px_rgba(190,18,60,0.3)] disabled:opacity-40 inline-flex items-center gap-2"
                  >
                    <span>Xác nhận đáp án</span>
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </button>
                )}
                {phase === 'feedback' && (
                  <button type="button" onClick={() => void finish()} className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm font-bold shadow-[0_4px_14px_rgba(190,18,60,0.3)] inline-flex items-center gap-2">
                    <span>{s.index + 1 < s.total ? 'Câu Tiếp Theo' : 'Hoàn Thành Phiên'}</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/20 font-mono text-[11px]">Enter</kbd>
                  </button>
                )}
                {phase === 'finishing' && <span className="px-4 py-2.5 text-on-surface-variant">Đang lưu kết quả...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/** Thẻ đề bài bên trái: chỉ hiển thị phần server cho phép (không lộ đáp án). */
function PromptCard({ q, revealed }: { q: Question; revealed: boolean }) {
  const d = q.display;
  const rv = q.reveal;
  const showReveal = revealed && rv && (q.exerciseType === 'WRITING' || q.inputMode === 'flashcard');
  return (
    <div className="relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col items-center text-center">
      <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>
      <div className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none"></div>
      {(rv?.level || rv?.partOfSpeech) && (
        <div className="w-full flex items-center justify-between pb-space-md">
          <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider">{rv.level ?? ''}</span>
          <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider uppercase">{rv.partOfSpeech ?? ''}</span>
        </div>
      )}
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">{q.prompt}</p>

      {d.audioText && !d.hanzi && !d.sentence && (
        <button type="button" onClick={() => speak(d.audioText!)} className="w-24 h-24 rounded-full bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary flex items-center justify-center shadow-sm my-3 transition-all">
          <span className="material-symbols-outlined text-[48px]">volume_up</span>
        </button>
      )}
      {d.hanzi && (
        <div className="relative my-2 py-3 px-8 rounded-2xl bg-surface-container-low/60 flex items-center justify-center min-w-[220px]">
          <span className="font-display-character text-display-character text-on-surface tracking-wider select-none font-bold">{d.hanzi}</span>
        </div>
      )}
      {d.sentence && <span className="font-display-character text-[34px] leading-tight text-on-surface font-bold my-2">{d.sentence}</span>}
      {d.meaning && !showReveal && <span className="font-headline-lg text-headline-lg text-on-surface font-bold my-2">{d.meaning}</span>}
      {d.sentenceMeaning && <span className="font-title-md text-title-md text-on-surface my-2">“{d.sentenceMeaning}”</span>}
      {d.pinyin && (
        <div className="flex items-center gap-2 mt-2 mb-1">
          <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-wide">{d.pinyin}</span>
          {d.audioText && (
            <button className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all shadow-sm" title="Phát âm" type="button" onClick={() => speak(d.audioText!)}>
              <span className="material-symbols-outlined text-[20px]">volume_up</span>
            </button>
          )}
        </div>
      )}
      {q.hint && q.inputMode === 'choice' && q.exerciseType === 'REVERSE_QUIZ' && <HintPinyin hint={q.hint} />}
      {showReveal && rv && (
        <div className="mt-3 flex flex-col items-center gap-1">
          <span className="font-display-character text-[56px] font-bold text-on-surface">{rv.hanzi}</span>
          <span className="text-primary font-title-md font-bold">{rv.pinyin}</span>
          <span className="text-on-surface">{rv.meaning}</span>
        </div>
      )}
    </div>
  );
}

function HintPinyin({ hint }: { hint: string }) {
  const [show, setShow] = useState(false);
  return (
    <button type="button" onClick={() => setShow((v) => !v)} className="mt-2 px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-md inline-flex items-center gap-1">
      <span className="material-symbols-outlined text-[16px]">lightbulb</span> {show ? hint : 'Gợi ý phát âm'}
    </button>
  );
}

interface SelfProps {
  q: Question;
  revealed: boolean;
  setRevealed: (v: boolean) => void;
  transcript: string;
  setTranscript: (v: string) => void;
  onRate: (quality: number) => void;
  busy: boolean;
}

/** Dạng tự chấm: flashcard (Again/Hard/Good/Easy), luyện viết (vẽ rồi đối chiếu), luyện nói (nhận dạng giọng nói nếu có). */
function SelfView({ q, revealed, setRevealed, transcript, setTranscript, onRate, busy }: SelfProps) {
  const rv = q.reveal!;
  const SR = useMemo(() => (window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any }), []);
  const Rec = SR.SpeechRecognition ?? SR.webkitSpeechRecognition;
  const [listening, setListening] = useState(false);

  const listen = () => {
    if (!Rec) return;
    const rec = new Rec();
    rec.lang = 'zh-CN';
    rec.onresult = (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => setTranscript(e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    setListening(true);
    rec.start();
  };

  const matched = transcript && transcript.replace(/[\s。，！？]/g, '') === rv.hanzi;

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
      {q.exerciseType === 'WRITING' && <DrawPad resetKey={q.vocabularyId} />}

      {q.exerciseType === 'SPEAKING' && (
        <div className="flex flex-col items-center gap-space-sm">
          {Rec ? (
            <button type="button" onClick={listen} className={`px-5 py-3 rounded-full font-title-sm font-bold inline-flex items-center gap-2 ${listening ? 'bg-error text-on-error animate-pulse' : 'bg-primary-container text-on-primary'}`}>
              <span className="material-symbols-outlined">mic</span> {listening ? 'Đang nghe...' : 'Bấm để nói'}
            </button>
          ) : (
            <p className="text-on-surface-variant font-body-sm">Trình duyệt chưa hỗ trợ nhận dạng giọng nói — hãy đọc to rồi tự đánh giá.</p>
          )}
          {transcript && (
            <p className={`font-body-md ${matched ? 'text-secondary' : 'text-on-surface-variant'}`}>
              Nghe được: <strong className="font-display-character text-[22px]">{transcript}</strong> {matched ? '✓ khớp' : ''}
            </p>
          )}
        </div>
      )}

      {!revealed ? (
        <button type="button" onClick={() => setRevealed(true)} className="self-center px-6 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high font-title-sm font-bold inline-flex items-center gap-2">
          <span className="material-symbols-outlined">flip</span> {q.inputMode === 'flashcard' ? 'Lật thẻ' : 'Xem đáp án'}
          <kbd className="px-1.5 py-0.5 rounded bg-black/10 font-mono text-[11px]">Space</kbd>
        </button>
      ) : (
        <>
          <div className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-1 text-left">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Đáp án</span>
            <span className="font-title-md text-on-surface font-semibold">{rv.meaning}</span>
            <span className="text-primary font-bold">{rv.pinyin}</span>
            {rv.example && (
              <div className="mt-2 text-on-surface-variant font-body-sm">
                <p className="font-display-character text-[20px] text-on-surface">{rv.example.hanzi}</p>
                <p>{rv.example.pinyin}</p>
                <p>“{rv.example.meaning}”</p>
              </div>
            )}
            {rv.reviewCount > 0 && (
              <p className="mt-2 font-label-sm text-on-surface-variant">Đã ôn {rv.reviewCount} lần{rv.accuracy !== null ? ` • Tỷ lệ đúng ${rv.accuracy}%` : ''}</p>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
            {RATINGS.map((r, i) => (
              <button key={r.key} type="button" disabled={busy} onClick={() => onRate(r.quality)} className={`${r.tone} rounded-xl py-3 px-2 flex flex-col items-center gap-0.5 hover:scale-[1.02] transition-all disabled:opacity-50`}>
                <span className="font-title-sm font-bold">{r.label}</span>
                <span className="font-label-sm opacity-80">{r.en} • {i + 1}</span>
                {rv.preview && <span className="font-label-sm font-mono">+{rv.preview[r.key]} ngày</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
