import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { myWordsApi, pinyinApi, vocabularyApi } from '../api';
import PinyinInput from './PinyinInput';
import type { NewVocabularyInput } from '../api';
import { ApiError } from '../lib/api';
import type { Example, Vocabulary, WordLookupResult } from '../lib/types.ts';
import { speak } from '../lib/speak';

const card =
  'bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col gap-space-md';
const input =
  'w-full bg-surface-container-low rounded-xl px-4 py-3 font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-fixed-dim disabled:opacity-60 disabled:cursor-not-allowed';
const label = 'font-label-md text-label-md text-on-surface font-semibold';
const LEVELS = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];

/** Câu ví dụ trong form; `ai` = còn là gợi ý AI chưa được bạn chỉnh sửa/xác nhận (không gửi lên server). */
type ExampleRow = Example & { ai?: boolean; explanation?: string | null };
type AiField = 'pinyin' | 'meaning' | 'level' | 'pos' | 'notes';

function AiBadge({ extra }: { extra?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 font-label-sm font-bold"
      title="Dữ liệu do AI đề xuất, chưa được xác minh. Sửa lại nếu cần."
    >
      <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI gợi ý{extra ? ` • ${extra}` : ''}
    </span>
  );
}

/** "HSK1" / "hsk 1" → "HSK 1" để khớp các lựa chọn trong ô Cấp độ (dữ liệu seed có thể lưu dạng "HSK1"). */
const normLevel = (v?: string | null) => {
  const m = /^hsk\s*([1-6])$/i.exec((v ?? '').trim());
  return m ? `HSK ${m[1]}` : (v ?? '').trim();
};
const isCompleteExample = (x: { sentenceHanzi: string; sentencePinyin: string; sentenceMeaning: string }) =>
  Boolean(x.sentenceHanzi.trim() && x.sentencePinyin.trim() && x.sentenceMeaning.trim());
const exampleKey = (x: { sentenceHanzi: string; sentencePinyin: string; sentenceMeaning: string }) =>
  [x.sentenceHanzi, x.sentencePinyin, x.sentenceMeaning].map((t) => t.trim()).join('|');

interface Props {
  /** Có `initial` = chế độ sửa. */
  initial?: Vocabulary;
  /** Dữ liệu cá nhân (chỉ ở chế độ sửa). */
  personal?: { note: string | null; mnemonic: string | null };
  /** Từ đã nằm trong danh sách học của bạn chưa (chế độ sửa). Chưa có thì chưa thể lưu ghi chú riêng. */
  inMyList?: boolean;
  /** Được phép sửa bản gốc dùng chung? Mặc định true; false → khoá các ô dữ liệu chung, chỉ sửa được phần riêng. */
  canEditShared?: boolean;
  otherLearners?: number;
  /** Tải lại dữ liệu trang cha (vd sau khi vừa thêm từ vào danh sách). */
  onChanged?: () => void;
}

export default function VocabularyForm({
  initial,
  personal,
  inMyList = true,
  canEditShared = true,
  otherLearners = 0,
  onChanged,
}: Props) {
  const navigate = useNavigate();
  const editing = Boolean(initial);
  const [hanzi, setHanzi] = useState(initial?.hanzi ?? '');
  const [pinyin, setPinyin] = useState(initial?.pinyin ?? '');
  const [meaning, setMeaning] = useState(initial?.meaning ?? '');
  const [level, setLevel] = useState(normLevel(initial?.level));
  const [pos, setPos] = useState(initial?.partOfSpeech ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));
  const [examples, setExamples] = useState<ExampleRow[]>(initial?.examples ?? []);
  const [stage, setStage] = useState<'new' | 'learning' | 'familiar'>('new');
  const [reviewNow, setReviewNow] = useState(false);
  const [note, setNote] = useState(personal?.note ?? '');
  const [mnemonic, setMnemonic] = useState(personal?.mnemonic ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [suggestions, setSuggestions] = useState<(Vocabulary & { inMyList: boolean })[] | null>(null);
  const [lookupBusy, setLookupBusy] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  // --- Tra cứu bằng AI: chỉ ĐIỀN VÀO FORM để bạn xem/sửa; không lưu gì cho đến khi bấm "Lưu" ---
  const [aiBusy, setAiBusy] = useState(false);
  const [aiExamplesBusy, setAiExamplesBusy] = useState(false);
  const [aiResult, setAiResult] = useState<WordLookupResult | null>(null);
  /** Các trường đang chứa giá trị do AI đề xuất và chưa được bạn sửa → hiện nhãn "AI gợi ý". */
  const [aiFields, setAiFields] = useState<Set<AiField>>(new Set());
  const unmark = (f: AiField) =>
    setAiFields((prev) => {
      if (!prev.has(f)) return prev;
      const n = new Set(prev);
      n.delete(f);
      return n;
    });
  const mark = (f: AiField) => setAiFields((prev) => new Set(prev).add(f));

  /** Chỉ điền vào ô còn TRỐNG - không ghi đè dữ liệu bạn đã nhập. */
  const applyAiSuggestion = (res: WordLookupResult) => {
    const sg = res.suggestion;
    const fromDb = res.existing.items.some((i) => i.hanzi === sg.hanzi);
    const marked: AiField[] = [];
    if (!pinyin.trim() && sg.pinyin) setPinyin(sg.pinyin);
    if (!meaning.trim() && sg.meaning) {
      setMeaning(sg.meaning);
      if (sg.sources.meaning === 'ai') marked.push('meaning');
    }
    if (!level && sg.level && LEVELS.includes(sg.level)) {
      setLevel(sg.level);
      if (sg.sources.level === 'ai') marked.push('level');
    }
    if (!pos.trim() && sg.partOfSpeech) {
      setPos(sg.partOfSpeech);
      if (!fromDb) marked.push('pos');
    }
    if (!notes.trim() && sg.notes) {
      setNotes(sg.notes);
      if (!fromDb) marked.push('notes');
    }
    setExamples((cur) => {
      const have = new Set(cur.map((x) => x.sentenceHanzi.trim()));
      const add = sg.examples
        .filter((e) => !have.has(e.sentenceHanzi))
        .map((e) => ({
          sentenceHanzi: e.sentenceHanzi,
          sentencePinyin: e.sentencePinyin,
          sentenceMeaning: e.sentenceMeaning,
          explanation: e.explanation,
          ai: e.source === 'ai',
        }));
      return [
        ...cur.filter((x) => x.sentenceHanzi.trim() || x.sentencePinyin.trim() || x.sentenceMeaning.trim()),
        ...add,
      ];
    });
    setAiFields((prev) => {
      const n = new Set(prev);
      marked.forEach((f) => n.add(f));
      return n;
    });
  };

  const aiLookup = async (force = false) => {
    const text = hanzi.trim();
    if (!text || aiBusy) return;
    setAiBusy(true);
    setError(null);
    setInfo(null);
    try {
      const res = await vocabularyApi.aiLookup({ text, force: force || undefined });
      setAiResult(res);
      setSuggestions(res.existing.items.length > 0 ? res.existing.items : null);
      applyAiSuggestion(res);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không tra cứu được bằng AI.');
    } finally {
      setAiBusy(false);
    }
  };

  const regenerateExamples = async () => {
    const text = hanzi.trim();
    if (!text || aiExamplesBusy) return;
    setAiExamplesBusy(true);
    setError(null);
    try {
      const res = await vocabularyApi.aiLookup({
        text,
        focus: 'examples',
        avoidSentences: examples
          .map((x) => x.sentenceHanzi.trim())
          .filter(Boolean)
          .slice(-10),
      });
      const fresh = res.suggestion.examples.filter((e) => e.source === 'ai');
      if (res.ai.status !== 'ok' || fresh.length === 0) {
        setError(res.ai.message ?? 'AI chưa tạo được ví dụ mới. Hãy thử lại.');
        return; // giữ nguyên ví dụ hiện có
      }
      // Thay các ví dụ AI chưa chỉnh sửa; giữ nguyên ví dụ bạn đã tự nhập/sửa.
      setExamples((cur) => [
        ...cur.filter((x) => !x.ai),
        ...fresh.map((e) => ({
          sentenceHanzi: e.sentenceHanzi,
          sentencePinyin: e.sentencePinyin,
          sentenceMeaning: e.sentenceMeaning,
          explanation: e.explanation,
          ai: true,
        })),
      ]);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không tạo lại được ví dụ.');
    } finally {
      setAiExamplesBusy(false);
    }
  };

  const lookup = async () => {
    if (!hanzi.trim()) return;
    setLookupBusy(true);
    setInfo(null);
    try {
      const res = await vocabularyApi.lookup(hanzi.trim());
      setSuggestions(res.items);
      if (res.items.length === 0) setInfo('Chưa có trong kho chung — hãy nhập Pinyin và nghĩa bên dưới.');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không tra cứu được.');
    } finally {
      setLookupBusy(false);
    }
  };

  /** Tạo Pinyin tự động từ Hán tự (nút bấm, hoặc khi rời ô Hán tự mà Pinyin còn trống). */
  const [pinyinBusy, setPinyinBusy] = useState(false);
  const autoPinyin = async (silent = false) => {
    if (!hanzi.trim()) return;
    setPinyinBusy(true);
    try {
      const res = await pinyinApi.convert(hanzi.trim(), 'word');
      setPinyin(res.pinyin);
    } catch (e) {
      if (!silent) setError(e instanceof ApiError ? e.message : 'Không tạo được Pinyin.');
    } finally {
      setPinyinBusy(false);
    }
  };
  const autoExamplePinyin = async (i: number) => {
    const text = examples[i]?.sentenceHanzi.trim();
    if (!text) return;
    try {
      const res = await pinyinApi.convert(text, 'sentence');
      setExamples((all) => all.map((x, j) => (j === i ? { ...x, sentencePinyin: res.pinyin } : x)));
    } catch {
      /* bỏ qua */
    }
  };

  const fill = (v: Vocabulary) => {
    setHanzi(v.hanzi);
    setPinyin(v.pinyin);
    setMeaning(v.meaning);
    setLevel(v.level ?? '');
    setPos(v.partOfSpeech ?? '');
    setExamples(v.examples);
    setTags(v.tags.join(', '));
    setSuggestions(null);
  };

  const addExisting = async (v: Vocabulary) => {
    try {
      await myWordsApi.add(v.id);
      navigate(`/vocabulary/${v.id}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không thêm được từ.');
    }
  };

  const lockShared = editing && !canEditShared;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);
    const body = {
      hanzi: hanzi.trim(),
      pinyin: pinyin.trim(),
      meaning: meaning.trim(),
      level: level || undefined,
      partOfSpeech: pos.trim() || undefined,
      notes: notes.trim() || undefined,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      examples: examples.filter(isCompleteExample).map(({ sentenceHanzi, sentencePinyin, sentenceMeaning }) => ({
        sentenceHanzi,
        sentencePinyin,
        sentenceMeaning,
      })),
    };
    try {
      if (initial) {
        // 1) Ghi chú / mẹo nhớ RIÊNG → bảng của người dùng (PATCH /user-vocabularies). Lưu trước để không bao giờ mất,
        //    và KHÔNG đụng tới bản gốc dùng chung.
        const personalChanged =
          (note.trim() || null) !== ((personal?.note ?? '').trim() || null) ||
          (mnemonic.trim() || null) !== ((personal?.mnemonic ?? '').trim() || null);
        if (inMyList && personalChanged) {
          await myWordsApi.update(initial.id, { note: note.trim() || null, mnemonic: mnemonic.trim() || null });
        }

        // 2) Dữ liệu CHUNG (kho thư viện) → chỉ gửi khi được phép VÀ thực sự có thay đổi.
        const sharedChanged =
          body.hanzi !== initial.hanzi.trim() ||
          body.pinyin !== initial.pinyin.trim() ||
          body.meaning !== initial.meaning.trim() ||
          (level || '') !== normLevel(initial.level) ||
          pos.trim() !== (initial.partOfSpeech ?? '').trim() ||
          notes.trim() !== (initial.notes ?? '').trim() ||
          [...body.tags].sort().join(',') !== [...initial.tags].sort().join(',') ||
          body.examples.map(exampleKey).join('\n') !==
            initial.examples.filter(isCompleteExample).map(exampleKey).join('\n');
        if (canEditShared && sharedChanged) {
          // Gửi chuỗi rỗng (thay vì bỏ trường) để người dùng xoá được giá trị cũ; backend đổi "" → NULL.
          await vocabularyApi.update(initial.id, {
            ...body,
            level: level || '',
            partOfSpeech: pos.trim(),
            notes: notes.trim(),
          });
        }
        navigate(`/vocabulary/${initial.id}`);
      } else {
        const created = await vocabularyApi.create({
          ...body,
          addToMyList: true,
          initialStage: stage,
          reviewNow,
        } as NewVocabularyInput);
        navigate(`/vocabulary/${created.id}`);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setFieldErrors(err.fieldErrors ?? {});
      } else setError('Đã xảy ra lỗi.');
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!initial || !window.confirm('Đặt lại toàn bộ tiến độ SRS của từ này về "Từ mới"?')) return;
    try {
      await myWordsApi.update(initial.id, { resetProgress: true });
      navigate(`/vocabulary/${initial.id}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không đặt lại được tiến độ.');
    }
  };
  const removeFromList = async () => {
    if (!initial || !window.confirm('Xóa từ này khỏi danh sách học của bạn?')) return;
    try {
      await myWordsApi.remove(initial.id);
      navigate('/vocabulary');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không xóa được khỏi danh sách học.');
    }
  };
  const addToMyList = async () => {
    if (!initial) return;
    try {
      await myWordsApi.add(initial.id);
      onChanged?.();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không thêm được từ vào danh sách học.');
    }
  };

  const err = (k: string) => fieldErrors[k]?.[0] && <p className="text-error font-label-sm">{fieldErrors[k][0]}</p>;

  return (
    <form onSubmit={submit} className="max-w-4xl mx-auto flex flex-col gap-space-lg pb-space-xl">
      <div className="flex flex-col gap-1">
        <span className="font-label-sm uppercase tracking-wider text-primary font-bold">Quản lý Tri thức</span>
        <h1 className="font-headline-xl text-headline-xl font-bold">
          {editing ? 'Chỉnh Sửa Từ Vựng' : 'Thêm Từ Vựng Mới'}
        </h1>
        <p className="text-on-surface-variant font-body-md">
          {editing
            ? 'Cập nhật thông tin từ và ghi chú cá nhân của bạn.'
            : 'Nhập Hán tự để tra cứu trong kho chung, hoặc tự điền thông tin rồi đưa vào lộ trình SRS.'}
        </p>
      </div>

      {lockShared && (
        <p
          role="note"
          className="rounded-xl bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-3 font-body-sm flex items-start gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">lock</span>
          <span>
            Từ này thuộc kho chung và đang được <b>{otherLearners} người dùng khác</b> học, nên phần thông tin gốc (Hán
            tự, Pinyin, nghĩa, ví dụ...) được khoá. Bạn vẫn có thể ghi chú và đặt mẹo nhớ <b>riêng</b> bên dưới — phần
            này chỉ lưu trong tài khoản của bạn.
          </span>
        </p>
      )}

      <fieldset disabled={lockShared} className="contents">
        <div className={card}>
          <label className={label} htmlFor="hanzi">
            Hán tự
          </label>
          <div className="flex flex-wrap gap-space-sm">
            <input
              id="hanzi"
              className={`${input} !w-auto flex-1 min-w-[10rem] font-display-character text-[28px]`}
              value={hanzi}
              onChange={(e) => {
                setHanzi(e.target.value);
                if (aiResult && e.target.value.trim() !== aiResult.input) setAiResult(null);
              }}
              onBlur={() => {
                if (!editing && !pinyin.trim()) void autoPinyin(true);
              }}
              placeholder="老师"
              lang="zh"
              required
              maxLength={50}
            />
            {hanzi && (
              <button
                type="button"
                onClick={() => speak(hanzi)}
                className="px-3 rounded-xl bg-primary-fixed text-on-primary-fixed"
                title="Nghe"
              >
                <span className="material-symbols-outlined">volume_up</span>
              </button>
            )}
            {!editing && (
              <button
                type="button"
                onClick={lookup}
                disabled={lookupBusy || !hanzi.trim()}
                className="px-4 rounded-xl bg-tertiary-container text-on-tertiary font-title-sm font-bold disabled:opacity-50 whitespace-nowrap"
              >
                {lookupBusy ? 'Đang tra...' : 'Tra cứu kho từ'}
              </button>
            )}
            {!editing && (
              <button
                type="button"
                onClick={() => void aiLookup()}
                disabled={aiBusy || !hanzi.trim()}
                className="px-4 rounded-xl bg-primary-container text-on-primary font-title-sm font-bold disabled:opacity-50 whitespace-nowrap inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                {aiBusy ? 'AI đang tra...' : 'Tra cứu bằng AI'}
              </button>
            )}
          </div>
          {err('hanzi')}
          {info && <p className="text-on-surface-variant font-body-sm">{info}</p>}
          {suggestions && suggestions.length > 0 && (
            <div className="rounded-xl bg-surface-container-low p-space-sm flex flex-col gap-space-xs">
              <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Đã có trong kho chung
              </span>
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-space-sm p-2 rounded-lg bg-surface-container-lowest"
                >
                  <div>
                    <span className="font-display-character text-[24px] font-bold mr-2">{s.hanzi}</span>
                    <span className="text-primary font-bold mr-2">{s.pinyin}</span>
                    <span className="text-on-surface-variant">{s.meaning}</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fill(s)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container font-label-md"
                    >
                      Điền sẵn
                    </button>
                    {s.inMyList ? (
                      <Link
                        to={`/vocabulary/${s.id}`}
                        className="px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-md"
                      >
                        Đã có trong danh sách
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addExisting(s)}
                        className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md font-bold"
                      >
                        Thêm vào danh sách
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {aiResult && (
            <div
              className="rounded-xl bg-surface-container-low p-space-sm flex flex-col gap-space-xs"
              aria-live="polite"
            >
              {aiResult.aiGenerated && (
                <p className="rounded-lg bg-tertiary-fixed text-on-tertiary-fixed px-3 py-2 font-body-sm flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span>
                    Một phần dữ liệu do <b>AI đề xuất</b> và có thể chưa chính xác. Hãy kiểm tra, chỉnh sửa rồi mới lưu
                    — chưa có gì được lưu cho đến khi bạn bấm “Lưu”.
                  </span>
                </p>
              )}
              {aiResult.ai.status === 'skipped' && (
                <p className="font-body-sm text-on-surface-variant">
                  Từ này đã có đủ nghĩa và ví dụ trong kho chung nên không cần gọi AI.{' '}
                  <button
                    type="button"
                    onClick={() => void aiLookup(true)}
                    disabled={aiBusy}
                    className="text-primary font-bold disabled:opacity-50"
                  >
                    Vẫn nhờ AI gợi ý thêm
                  </button>
                </p>
              )}
              {(aiResult.ai.status === 'unavailable' || aiResult.ai.status === 'error') && aiResult.ai.message && (
                <p role="status" className="font-body-sm text-on-surface-variant">
                  {aiResult.ai.message} Pinyin vẫn được tạo từ thư viện; các ô còn lại bạn tự nhập.
                </p>
              )}
              {aiResult.ai.cached && (
                <p className="font-label-sm text-on-surface-variant">Kết quả AI được dùng lại từ lần tra trước.</p>
              )}
              {aiResult.warnings.map((w) => (
                <p key={w} className="font-body-sm text-on-surface-variant">
                  • {w}
                </p>
              ))}
              {aiResult.suggestion.aiMeaning && meaning.trim() !== aiResult.suggestion.aiMeaning && (
                <p className="font-body-sm text-on-surface-variant">
                  AI gợi ý nghĩa khác với nghĩa trong kho: <b>{aiResult.suggestion.aiMeaning}</b>{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMeaning(aiResult.suggestion.aiMeaning ?? '');
                      mark('meaning');
                    }}
                    className="text-primary font-bold"
                  >
                    Dùng nghĩa này
                  </button>
                </p>
              )}
              {(
                [
                  ['pinyin', 'Pinyin', aiResult.suggestion.pinyin, pinyin, setPinyin],
                  ['meaning', 'Nghĩa', aiResult.suggestion.meaning, meaning, setMeaning],
                  ['pos', 'Từ loại', aiResult.suggestion.partOfSpeech ?? '', pos, setPos],
                ] as [AiField, string, string, string, (v: string) => void][]
              )
                .filter(([, , sugg, cur]) => sugg && cur.trim() && cur.trim() !== sugg)
                .map(([f, name, sugg, , set]) => (
                  <p key={f} className="font-body-sm text-on-surface-variant">
                    Gợi ý {name}: <b>{sugg}</b> (khác giá trị bạn đã nhập){' '}
                    <button
                      type="button"
                      onClick={() => {
                        set(sugg);
                        if (
                          f !== 'pinyin' &&
                          !aiResult.existing.items.some((i) => i.hanzi === aiResult.suggestion.hanzi)
                        )
                          mark(f);
                        else unmark(f);
                      }}
                      className="text-primary font-bold"
                    >
                      Dùng gợi ý
                    </button>
                  </p>
                ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className={label} htmlFor="pinyin">
                  Pinyin
                </label>
                <button
                  type="button"
                  onClick={() => void autoPinyin()}
                  disabled={pinyinBusy || !hanzi.trim()}
                  className="text-primary font-label-sm font-bold disabled:opacity-50 inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>{' '}
                  {pinyinBusy ? 'Đang tạo...' : 'Tạo từ Hán tự'}
                </button>
              </div>
              <PinyinInput
                id="pinyin"
                className={input}
                value={pinyin}
                onChange={(v) => {
                  setPinyin(v);
                  unmark('pinyin');
                }}
                placeholder="lǎoshī"
                required
                maxLength={200}
              />
              {aiResult && aiResult.suggestion.alternativeReadings.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 font-label-sm text-on-surface-variant">
                  <span>Cách đọc khác:</span>
                  {aiResult.suggestion.alternativeReadings.map((r) => (
                    <button
                      key={r.pinyin}
                      type="button"
                      onClick={() => {
                        setPinyin(r.pinyin);
                        unmark('pinyin');
                      }}
                      className="px-2 py-0.5 rounded-full bg-surface-container hover:bg-primary-fixed font-bold"
                      title={r.meaning ?? (r.source === 'ai' ? 'AI đề xuất' : 'Từ thư viện Pinyin')}
                    >
                      {r.pinyin}
                      {r.meaning ? ` — ${r.meaning}` : ''}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-on-surface-variant font-label-sm">
                Gõ số thanh điệu (<b>lao3shi1</b> → lǎoshī, <b>nv3</b> → nǚ) hoặc để trống rồi bấm "Tạo từ Hán tự". Chữ
                Hán gõ nhầm vào đây sẽ tự đổi lại thành Pinyin.
              </p>
              {err('pinyin')}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className={label} htmlFor="meaning">
                  Nghĩa tiếng Việt
                </label>
                {aiFields.has('meaning') && <AiBadge />}
              </div>
              <input
                id="meaning"
                className={input}
                value={meaning}
                onChange={(e) => {
                  setMeaning(e.target.value);
                  unmark('meaning');
                }}
                placeholder="giáo viên"
                required
                maxLength={500}
              />
              {err('meaning')}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className={label} htmlFor="level">
                  Cấp độ
                </label>
                {aiFields.has('level') && <AiBadge extra="chưa xác minh" />}
              </div>
              <select
                id="level"
                className={input}
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  unmark('level');
                }}
              >
                <option value="">Không xác định</option>
                {LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className={label} htmlFor="pos">
                  Từ loại
                </label>
                {aiFields.has('pos') && <AiBadge />}
              </div>
              <input
                id="pos"
                className={input}
                value={pos}
                onChange={(e) => {
                  setPos(e.target.value);
                  unmark('pos');
                }}
                placeholder="Danh từ"
                maxLength={50}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label} htmlFor="tags">
              Thẻ (cách nhau bằng dấu phẩy)
            </label>
            <input
              id="tags"
              className={input}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Trường học, Giao tiếp"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <label className={label} htmlFor="notes">
                Ghi chú chung
              </label>
              {aiFields.has('notes') && <AiBadge />}
            </div>
            <textarea
              id="notes"
              className={input}
              rows={aiFields.has('notes') ? 5 : 2}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                unmark('notes');
              }}
              maxLength={5000}
            />
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between">
            <h2 className="font-title-md font-bold">Câu ví dụ</h2>
            <div className="flex flex-wrap gap-space-xs justify-end">
              <button
                type="button"
                onClick={() => void regenerateExamples()}
                disabled={aiExamplesBusy || !hanzi.trim()}
                className="px-3 py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-md inline-flex items-center gap-1 disabled:opacity-50"
                title="Nhờ AI tạo ví dụ mới (giữ nguyên các câu bạn đã tự nhập/sửa)"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>{' '}
                {aiExamplesBusy ? 'Đang tạo...' : examples.some((x) => x.ai) ? 'Tạo lại ví dụ' : 'Tạo ví dụ bằng AI'}
              </button>
              <button
                type="button"
                onClick={() =>
                  setExamples((x) => [...x, { sentenceHanzi: '', sentencePinyin: '', sentenceMeaning: '' }])
                }
                className="px-3 py-1.5 rounded-lg bg-surface-container font-label-md inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">add</span> Thêm câu
              </button>
            </div>
          </div>
          {examples.length === 0 && (
            <p className="text-on-surface-variant font-body-sm">
              Có câu ví dụ thì các dạng bài Điền từ, Sắp xếp câu, Dịch câu mới hoạt động cho từ này.
            </p>
          )}
          {examples.map((ex, i) => (
            <div key={i} className="rounded-xl bg-surface-container-low p-space-sm flex flex-col gap-space-xs">
              {ex.ai && (
                <div>
                  <AiBadge />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm items-start">
                <input
                  className={input}
                  placeholder="Câu tiếng Trung"
                  lang="zh"
                  value={ex.sentenceHanzi}
                  onChange={(e) =>
                    setExamples((all) =>
                      all.map((x, j) => (j === i ? { ...x, sentenceHanzi: e.target.value, ai: false } : x)),
                    )
                  }
                />
                <div className="flex gap-2">
                  <PinyinInput
                    className={input}
                    style="sentence"
                    placeholder="Pinyin"
                    value={ex.sentencePinyin}
                    onChange={(v) =>
                      setExamples((all) => all.map((x, j) => (j === i ? { ...x, sentencePinyin: v, ai: false } : x)))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => void autoExamplePinyin(i)}
                    disabled={!ex.sentenceHanzi.trim()}
                    className="px-2 rounded-lg text-primary hover:bg-primary-fixed disabled:opacity-40"
                    title="Tạo Pinyin từ câu tiếng Trung"
                  >
                    <span className="material-symbols-outlined">auto_fix_high</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    className={input}
                    placeholder="Nghĩa tiếng Việt"
                    value={ex.sentenceMeaning}
                    onChange={(e) =>
                      setExamples((all) =>
                        all.map((x, j) => (j === i ? { ...x, sentenceMeaning: e.target.value, ai: false } : x)),
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setExamples((all) => all.filter((_, j) => j !== i))}
                    className="px-2 rounded-lg text-error hover:bg-error-container"
                    title="Xóa câu"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              {ex.explanation && <p className="font-label-sm text-on-surface-variant">Cách dùng: {ex.explanation}</p>}
            </div>
          ))}
        </div>
      </fieldset>

      {editing && !inMyList ? (
        <div className={card}>
          <h2 className="font-title-md font-bold">Ghi chú riêng của bạn</h2>
          <p className="font-body-sm text-on-surface-variant">
            Từ này chưa có trong danh sách học của bạn. Hãy thêm vào danh sách để lưu ghi chú, mẹo nhớ riêng và theo dõi
            tiến độ SRS.
          </p>
          <div>
            <button
              type="button"
              onClick={() => void addToMyList()}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md font-bold"
            >
              Thêm vào danh sách học
            </button>
          </div>
        </div>
      ) : editing ? (
        <div className={card}>
          <h2 className="font-title-md font-bold">Ghi chú riêng của bạn</h2>
          <p className="font-label-sm text-on-surface-variant">
            Chỉ mình bạn thấy — lưu trong danh sách học của bạn, không thay đổi từ gốc trong thư viện.
          </p>
          <textarea
            className={input}
            rows={2}
            placeholder="Ghi chú cá nhân..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <textarea
            className={input}
            rows={2}
            placeholder="Mẹo liên tưởng của riêng bạn..."
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
          />
          <div className="flex flex-wrap gap-space-sm">
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-md font-bold"
            >
              Đặt lại tiến độ SRS
            </button>
            <button
              type="button"
              onClick={removeFromList}
              className="px-4 py-2 rounded-lg bg-error-container text-on-error-container font-label-md font-bold"
            >
              Xóa khỏi danh sách học
            </button>
          </div>
        </div>
      ) : (
        <div className={card}>
          <h2 className="font-title-md font-bold">Mức độ quen thuộc ban đầu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            {(
              [
                ['new', 'Chưa biết', 'Học như từ mới'],
                ['learning', 'Biết lờ mờ', 'Ôn lại sau 1 ngày'],
                ['familiar', 'Khá quen thuộc', 'Ôn lại sau 3 ngày'],
              ] as const
            ).map(([k, t, d]) => (
              <label
                key={k}
                className={`cursor-pointer rounded-xl p-space-md flex flex-col gap-0.5 ${stage === k ? 'bg-primary-fixed ring-2 ring-primary' : 'bg-surface-container-low'}`}
              >
                <input
                  type="radio"
                  name="stage"
                  className="sr-only"
                  checked={stage === k}
                  onChange={() => setStage(k)}
                />
                <span className="font-title-sm font-bold">{t}</span>
                <span className="font-label-sm text-on-surface-variant">{d}</span>
              </label>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 font-body-md">
            <input type="checkbox" checked={reviewNow} onChange={(e) => setReviewNow(e.target.checked)} /> Đưa vào hàng
            đợi ôn ngay
          </label>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-error-container text-on-error-container px-space-md py-2 font-body-sm">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-space-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-space-lg py-2.5 rounded-lg bg-surface-container font-title-sm font-bold"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={busy}
          className="px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold disabled:opacity-60"
        >
          {busy ? 'Đang lưu...' : editing ? 'Lưu thay đổi' : 'Lưu & đưa vào lộ trình học'}
        </button>
      </div>
    </form>
  );
}
