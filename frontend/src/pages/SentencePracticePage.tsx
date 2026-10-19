import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { myWordsApi, sentencesApi } from '../api';
import AppShell from '../layouts/AppShell';
import PageState, { EmptyState } from '../components/PageState';
import SentenceGenerator from '../components/SentenceGenerator';
import { ApiError } from '../lib/api';
import { speak } from '../lib/speak';
import useApi from '../lib/useApi';

const card = 'bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col gap-space-md';
const input = 'w-full bg-surface-container-low rounded-xl px-4 py-3 font-body-md outline-none focus:ring-2 focus:ring-primary-fixed-dim';
const EXERCISES = [
  { to: '/practice/sentence-order', icon: 'swap_horiz', title: 'Sắp xếp câu', desc: 'Ghép các mảnh thành câu đúng' },
  { to: '/practice/fill-blank', icon: 'edit_note', title: 'Điền chỗ trống', desc: 'Chọn từ còn thiếu trong câu' },
  { to: '/practice/translation', icon: 'translate', title: 'Dịch Trung → Việt', desc: 'Chọn bản dịch đúng' },
  { to: '/practice/translation-hub', icon: 'g_translate', title: 'Dịch Việt → Trung', desc: 'Gõ câu tiếng Trung' },
  { to: '/practice/sentence-creation', icon: 'draw', title: 'Tự đặt câu', desc: 'Đặt câu với từ cho trước' },
];

export default function SentencePracticePage() {
  const words = useApi(() => myWordsApi.list({ limit: 200 }));
  const sentences = useApi(() => sentencesApi.list());
  const [params] = useSearchParams();
  const [vocabId, setVocabId] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await sentencesApi.create({ vocabularyId: vocabId, sentence: text.trim() });
      setText('');
      sentences.reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Không lưu được câu.');
    }
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-space-lg pb-space-xl">
        <div>
          <span className="font-label-sm uppercase tracking-wider text-primary font-bold">Ngữ cảnh & Ngữ pháp</span>
          <h1 className="font-headline-xl text-headline-xl font-bold">Luyện Câu</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-space-md">
          {EXERCISES.map((x) => (
            <Link key={x.to} to={x.to} className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all flex flex-col gap-1">
              <span className="material-symbols-outlined text-primary">{x.icon}</span>
              <span className="font-title-sm font-bold">{x.title}</span>
              <span className="font-label-sm text-on-surface-variant">{x.desc}</span>
            </Link>
          ))}
        </div>

        <SentenceGenerator words={words.data?.items ?? []} initialWordId={params.get('word') ?? undefined} onSaved={sentences.reload} />

        <form onSubmit={save} className={card}>
          <h2 className="font-title-md font-bold">Viết câu của bạn</h2>
          <PageState state={words}>
            {(w) =>
              w.items.length === 0 ? (
                <EmptyState icon="menu_book" title="Chưa có từ để đặt câu" action={<Link to="/vocabulary/new" className="text-primary font-bold">Thêm từ vựng</Link>} />
              ) : (
                <select className={input} value={vocabId} onChange={(e) => setVocabId(e.target.value)} required>
                  <option value="">Chọn từ vựng...</option>
                  {w.items.map((i) => <option key={i.id} value={i.vocabularyId}>{i.vocabulary.hanzi} — {i.vocabulary.pinyin} ({i.vocabulary.meaning})</option>)}
                </select>
              )
            }
          </PageState>
          <textarea className={input} rows={2} lang="zh" placeholder="Nhập câu tiếng Trung có chứa từ đã chọn..." value={text} onChange={(e) => setText(e.target.value)} required maxLength={2000} />
          {error && <p role="alert" className="text-error font-body-sm">{error}</p>}
          <button type="submit" disabled={!vocabId || !text.trim()} className="self-end px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold disabled:opacity-40">Lưu câu</button>
        </form>

        <div className={card}>
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <h2 className="font-title-md font-bold">Câu đã lưu</h2>
            {(sentences.data ?? []).some((x) => x.translation) && (
              <Link to="/practice/saved-sentences" className="px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md font-bold inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">play_arrow</span> Luyện tập từ câu đã lưu
              </Link>
            )}
          </div>
          <PageState state={sentences}>
            {(list) =>
              list.length === 0 ? (
                <p className="text-on-surface-variant font-body-sm">Bạn chưa viết câu nào.</p>
              ) : (
                <div className="flex flex-col gap-space-sm">
                  {list.map((s) => (
                    <div key={s.id} className="rounded-xl bg-surface-container-low p-space-md flex items-start justify-between gap-space-sm">
                      <div>
                        <p className="font-display-character text-[22px] font-bold" lang="zh">{s.sentence}</p>
                        {s.pinyin && <p className="text-primary font-body-sm">{s.pinyin}</p>}
                        {s.translation && <p className="font-body-md">{s.translation}</p>}
                        {s.explanation && <p className="font-label-sm text-on-surface-variant">Cách dùng: {s.explanation}</p>}
                        <p className="font-label-sm text-on-surface-variant">{s.source === 'ai' ? 'AI tạo • ' : s.source === 'existing' ? 'Câu có sẵn • ' : ''}{s.level ? `${s.level} (ước lượng) • ` : ''}{s.usedWords && s.usedWords.length > 0 ? `Từ dùng: ${s.usedWords.map((w) => w.hanzi).join('、')}` : ''}</p>
                        <p className="font-label-sm text-on-surface-variant">Từ: {s.vocabulary?.hanzi} • {new Date(s.createdAt).toLocaleDateString('vi-VN')}{s.correction ? ` • Sửa: ${s.correction}` : ''}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button type="button" onClick={() => speak(s.sentence)} className="p-2 rounded-lg hover:bg-surface-container text-primary" title="Nghe"><span className="material-symbols-outlined text-[20px]">volume_up</span></button>
                        <button type="button" onClick={async () => { await sentencesApi.remove(s.id); sentences.reload(); }} className="p-2 rounded-lg hover:bg-error-container text-error" title="Xóa"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </PageState>
        </div>
      </div>
    </AppShell>
  );
}
