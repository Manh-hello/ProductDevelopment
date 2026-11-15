import { useState } from 'react';
import type { ReactNode } from 'react';
import type { CatalogWord } from '../../api';
import { speak } from '../../lib/speak';
import WordDetailModal from './WordDetailModal';

/** Một dòng từ vựng: Hán tự · Pinyin · nghĩa · từ loại · nghe · (nút hành động). Bấm vào từ để xem chi tiết. */
export default function WordRow({ word, action, onAdded }: { word: CatalogWord; action?: ReactNode; onAdded?: (wordId: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-space-sm rounded-xl bg-surface-container-low px-space-md py-3 hover:bg-surface-container transition-colors">
      <button type="button" onClick={() => setOpen(true)} className="flex flex-1 min-w-0 items-center gap-space-md text-left" aria-label={`Xem chi tiết ${word.hanzi}`}>
        <span className="font-display-character text-[28px] font-bold min-w-[72px] text-on-surface" lang="zh">{word.hanzi}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-primary font-title-sm font-bold">{word.pinyin}</span>
          <span className="block text-on-surface-variant font-body-md">{word.meaning}</span>
        </span>
        {word.partOfSpeech && (
          <span className="hidden sm:inline-flex shrink-0 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm">{word.partOfSpeech}</span>
        )}
        <span className="hidden sm:inline-flex shrink-0 items-center gap-0.5 text-primary font-label-md font-bold">
          Chi tiết <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </span>
      </button>
      <button type="button" onClick={() => speak(word.hanzi)} className="shrink-0 p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Nghe phát âm" aria-label={`Nghe ${word.hanzi}`}>
        <span className="material-symbols-outlined text-[20px]">volume_up</span>
      </button>
      {action}
      {open && <WordDetailModal wordId={word.id} onClose={() => setOpen(false)} onAdded={onAdded} />}
    </div>
  );
}
