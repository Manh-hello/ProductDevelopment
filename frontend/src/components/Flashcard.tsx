import { Volume2 } from "lucide-react";
import type { Vocabulary } from "../types/vocabulary";
import { cn } from "../utils/cn";

interface FlashcardProps {
  vocabulary: Vocabulary;
  revealed: boolean;
  onReveal: () => void;
}

export function Flashcard({ vocabulary, revealed, onReveal }: FlashcardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[360px] w-full flex-col items-center justify-center gap-6 rounded-2xl border border-border bg-bg-card px-8 py-12 text-center shadow-[var(--shadow-card)]",
        "transition-transform duration-300 ease-out"
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-label="Phát âm"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-colors hover:bg-navy-100"
      >
        <Volume2 className="h-5 w-5" />
      </button>

      <p className="font-hanzi text-7xl font-semibold text-ink">{vocabulary.hanzi}</p>

      {revealed ? (
        <div className="flex flex-col items-center gap-2 animate-[revealIn_200ms_ease-out]">
          <p className="text-lg font-medium text-primary-600">{vocabulary.pinyin}</p>
          <p className="text-xl font-semibold text-ink">{vocabulary.meaning}</p>
          {vocabulary.example ? (
            <div className="mt-3 max-w-md rounded-xl bg-bg px-4 py-3 text-sm text-ink-soft">
              <p className="font-hanzi text-ink">{vocabulary.example}</p>
              <p className="mt-1 text-primary-600">{vocabulary.examplePinyin}</p>
              <p className="mt-1">{vocabulary.exampleMeaning}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <button
          onClick={onReveal}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-primary-300 hover:text-primary-600"
        >
          Hiện nghĩa
        </button>
      )}
      <style>{`
        @keyframes revealIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
