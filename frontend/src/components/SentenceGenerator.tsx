import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sentencesApi } from '../api';
import { ApiError } from '../lib/api';
import { speak } from '../lib/speak';
import type { GeneratedSentence, GenerateSentencesResult, SentenceMode, UserVocabulary } from '../lib/types';
import { EmptyState, ErrorBox } from './PageState';

const card = 'bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col gap-space-md';
const input = 'w-full bg-surface-container-low rounded-xl px-4 py-3 font-body-md outline-none focus:ring-2 focus:ring-primary-fixed-dim';
const label = 'font-label-md text-label-md text-on-surface font-semibold';

const MODES: { key: SentenceMode; title: string; desc: string }[] = [
  { key: 'new_word', title: 'Với từ mới', desc: 'Một từ + các từ bạn đã học' },
  { key: 'review_mix', title: 'Ôn tập tổng hợp', desc: 'Trộn từ mới và từ cũ' },
  { key: 'topic', title: 'Theo chủ đề', desc: 'Trường học, ăn uống, công việc...' },
  { key: 'level', title: 'Theo trình độ', desc: 'Chọn mức HSK' },
  { key: 'selected_words', title: 'Từ tự chọn', desc: 'Chọn nhóm từ cụ thể' },
];
const TOPICS = [
  { key: 'school', label: 'Trường học' }, { key: 'family', label: 'Gia đình' }, { key: 'food', label: 'Ăn uống' },
  { key: 'shopping', label: 'Mua sắm' }, { key: 'time', label: 'Thời gian' }, { key: 'work', label: 'Công việc' },
  { key: 'daily', label: 'Giao tiếp hằng ngày' },
];
const LEVELS = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];
const MAX_SELECTED = 8;

interface Props {
  /** Từ trong danh sách học của bạn (đã tải ở trang cha). */
  words: UserVocabulary[];
  /** Từ được chọn sẵn (vd từ trang chi tiết từ: /sentences?word=<vocabularyId>) → chế độ "Với từ mới". */
  initialWordId?: string;
  /** Gọi sau khi lưu thành công để trang cha tải lại danh sách câu đã lưu. */
  onSaved: () => void;
}

export default function SentenceGenerator({ words, initialWordId, onSaved }: Props) {
  const [mode, setMode] = useState<SentenceMode>(initialWordId ? 'new_word' : 'review_mix');
  const [vocabId, setVocabId] = useState(initialWordId ?? '');
  const [selected, setSelected] = useState<string[]>([]);
  const [topic, setTopic] = useState('daily');
  const [level, setLevel] = useState('HSK 2');
  const [count, setCount] = useState(3);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateSentencesResult | null>(null);
  /** tempId → trạng thái lưu (chống bấm lưu nhiều lần, phân biệt xem trước và đã lưu). */
  const [saveState, setSaveState] = useState<Record<string, 'saving' | 'saved' | string>>({});

  useEffect(() => {
    if (initialWordId) { setMode('new_word'); setVocabId(initialWordId); }
  }, [initialWordId]);

  const canGenerate =
    !busy &&
    words.length > 0 &&
    (mode !== 'new_word' || Boolean(vocabId)) &&
    (mode !== 'selected_words' || selected.length > 0);

  const generate = async () => {
    if (!canGenerate) return;
    setBusy(true);
    setError(null);
    try {
      const res = await sentencesApi.generate({
        mode,
        count,
        ...(mode === 'new_word' ? { vocabularyId: vocabId } : {}),
        ...(mode === 'selected_words' ? { vocabularyIds: selected } : {}),
        ...(mode === 'topic' ? { topic } : {}),
        ...(mode === 'level' ? { level } : {}),
      });
      setResult(res);
      setSaveState({});
    } catch (e) {
      // Giữ nguyên kết quả cũ (nếu có) để không mất nội dung đang xem khi tạo lại thất bại.
      setError(e instanceof ApiError ? e.message : 'Không tạo được câu.');
    } finally {
      setBusy(false);
    }
  };

  const save = async (s: GeneratedSentence) => {
    if (saveState[s.tempId] === 'saving' || saveState[s.tempId] === 'saved') return;
    setSaveState((m) => ({ ...m, [s.tempId]: 'saving' }));
    try {
      await sentencesApi.create({
        vocabularyId: s.primaryVocabularyId,
        sentence: s.hanzi,
        translation: s.meaning,
        explanation: s.explanation ?? undefined,
        topic: s.topic ?? undefined,
        level: s.level ?? undefined,
        source: s.source,
        usedWords: s.usedWords.map(({ vocabularyId, role }) => ({ vocabularyId, role })),
      });
      setSaveState((m) => ({ ...m, [s.tempId]: 'saved' }));
      onSaved();
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Không lưu được câu.';
      // 409 = câu đã được lưu trước đó → coi như đã lưu.
      setSaveState((m) => ({ ...m, [s.tempId]: e instanceof ApiError && e.status === 409 ? 'saved' : msg }));
    }
  };

  const toggleSelected = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= MAX_SELECTED ? cur : [...cur, id]));

  return (
    <div className={card}>
      <div className="flex flex-col gap-1">
        <h2 className="font-title-md font-bold inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">auto_awesome</span> Tạo câu từ vốn từ của bạn
        </h2>
        <p className="text-on-surface-variant font-body-sm">Hệ thống chọn một nhóm từ nhỏ từ danh sách học của bạn rồi nhờ AI viết câu. Câu chỉ là bản xem trước cho đến khi bạn bấm “Lưu câu”.</p>
      </div>

      {words.length === 0 ? (
        <EmptyState icon="menu_book" title="Chưa có từ để tạo câu" hint="Hãy thêm từ vào danh sách học trước." action={<Link to="/vocabulary/new" className="text-primary font-bold">Thêm từ vựng</Link>} />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-space-sm" role="radiogroup" aria-label="Chế độ tạo câu">
            {MODES.map((m) => (
              <label key={m.key} className={`cursor-pointer rounded-xl p-space-sm flex flex-col gap-0.5 ${mode === m.key ? 'bg-primary-fixed ring-2 ring-primary' : 'bg-surface-container-low'}`}>
                <input type="radio" name="sentence-mode" className="sr-only" checked={mode === m.key} onChange={() => setMode(m.key)} />
                <span className="font-title-sm font-bold">{m.title}</span>
                <span className="font-label-sm text-on-surface-variant">{m.desc}</span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md items-end">
            {mode === 'new_word' && (
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className={label} htmlFor="gen-word">Từ mới</label>
                <select id="gen-word" className={input} value={vocabId} onChange={(e) => setVocabId(e.target.value)}>
                  <option value="">Chọn từ...</option>
                  {words.map((w) => <option key={w.id} value={w.vocabularyId}>{w.vocabulary.hanzi} — {w.vocabulary.pinyin} ({w.vocabulary.meaning})</option>)}
                </select>
              </div>
            )}
            {mode === 'topic' && (
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className={label} htmlFor="gen-topic">Chủ đề</label>
                <select id="gen-topic" className={input} value={topic} onChange={(e) => setTopic(e.target.value)}>
                  {TOPICS.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
              </div>
            )}
            {mode === 'level' && (
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className={label} htmlFor="gen-level">Trình độ</label>
                <select id="gen-level" className={input} value={level} onChange={(e) => setLevel(e.target.value)}>
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className={label} htmlFor="gen-count">Số câu</label>
              <select id="gen-count" className={input} value={count} onChange={(e) => setCount(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {mode === 'selected_words' && (
            <div className="flex flex-col gap-1.5">
              <span className={label}>Chọn từ ({selected.length}/{MAX_SELECTED})</span>
              <div className="flex flex-wrap gap-space-xs max-h-40 overflow-y-auto rounded-xl bg-surface-container-low p-space-sm">
                {words.map((w) => {
                  const on = selected.includes(w.vocabularyId);
                  return (
                    <button key={w.id} type="button" onClick={() => toggleSelected(w.vocabularyId)} aria-pressed={on} className={`px-3 py-1.5 rounded-lg font-body-md ${on ? 'bg-primary-container text-on-primary font-bold' : 'bg-surface-container-lowest'}`}>
                      {w.vocabulary.hanzi}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-space-sm">
            {result && !busy && <span className="font-label-sm text-on-surface-variant">Kết quả hiện tại chưa được lưu — tạo lại sẽ thay thế các câu chưa lưu.</span>}
            <button type="button" onClick={() => void generate()} disabled={!canGenerate} className="px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold disabled:opacity-40 inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">{result ? 'refresh' : 'auto_awesome'}</span>
              {busy ? 'Đang tạo câu...' : result ? 'Tạo lại' : 'Tạo câu'}
            </button>
          </div>
        </>
      )}

      {error && <ErrorBox message={error} onRetry={() => void generate()} />}

      {busy && !result && <p className="text-on-surface-variant font-body-sm text-center py-space-md" role="status">AI đang viết câu cho bạn...</p>}

      {result && (
        <div className="flex flex-col gap-space-sm" aria-live="polite">
          {result.usedFallback && (
            <p className="rounded-lg bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-2 font-body-sm">AI hiện không khả dụng — đang hiển thị câu ví dụ có sẵn trong kho từ vựng.</p>
          )}
          {result.warnings.map((w) => <p key={w} className="font-body-sm text-on-surface-variant">• {w}</p>)}
          <p className="font-label-sm text-on-surface-variant">
            Từ mục tiêu: {result.targets.map((t) => t.hanzi).join('、')}
            {!result.usedFallback && ' • Trình độ và độ tự nhiên do AI ước lượng, hãy kiểm tra lại nếu thấy lạ.'}
          </p>
          {result.sentences.map((s) => {
            const st = saveState[s.tempId];
            return (
              <div key={s.tempId} className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-space-xs">
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-display-character text-[24px] font-bold" lang="zh">{s.hanzi}</p>
                    <p className="text-primary font-body-md">{s.pinyin}</p>
                    <p className="font-body-md">{s.meaning}</p>
                  </div>
                  <button type="button" onClick={() => speak(s.hanzi)} className="p-2 rounded-lg hover:bg-surface-container text-primary shrink-0" title="Nghe">
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
                {s.explanation && <p className="font-label-sm text-on-surface-variant">Cách dùng: {s.explanation}</p>}
                <div className="flex flex-wrap items-center gap-1.5 font-label-sm">
                  {s.usedWords.map((w) => (
                    <span key={w.vocabularyId} className={`px-2 py-0.5 rounded-full font-bold ${w.role === 'target' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container text-on-surface-variant'}`} title={w.role === 'target' ? 'Từ mục tiêu' : 'Từ đã học'}>{w.hanzi}</span>
                  ))}
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">{s.source === 'ai' ? 'AI tạo' : 'Câu có sẵn'}</span>
                  {s.level && <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">{s.level} (ước lượng)</span>}
                </div>
                <div className="flex items-center justify-end gap-space-sm">
                  {st && st !== 'saving' && st !== 'saved' && <span role="alert" className="text-error font-label-sm">{st}</span>}
                  <button type="button" onClick={() => void save(s)} disabled={st === 'saving' || st === 'saved'} className="px-space-md py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-md font-bold disabled:opacity-60 inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">{st === 'saved' ? 'check' : 'bookmark_add'}</span>
                    {st === 'saving' ? 'Đang lưu...' : st === 'saved' ? 'Đã lưu' : 'Lưu câu'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
