import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Vocabulary } from "../types/vocabulary";
import { Badge } from "./ui/Badge";

const statusConfig = {
  new: { label: "Mới", tone: "primary" as const },
  learning: { label: "Đang học", tone: "warning" as const },
  mastered: { label: "Đã thuộc", tone: "success" as const },
};

interface VocabularyCardProps {
  vocabulary: Vocabulary;
  onEdit?: (vocabulary: Vocabulary) => void;
  onDelete?: (vocabulary: Vocabulary) => void;
}

export function VocabularyCard({ vocabulary, onEdit, onDelete }: VocabularyCardProps) {
  const status = statusConfig[vocabulary.status];

  return (
    <div className="group relative rounded-2xl border border-border bg-bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/vocabulary/${vocabulary.id}`} className="min-w-0">
          <p className="font-hanzi text-3xl font-semibold leading-none text-ink">
            {vocabulary.hanzi}
          </p>
          <p className="mt-2 text-sm font-medium text-primary-600">{vocabulary.pinyin}</p>
          <p className="mt-0.5 truncate text-sm text-ink-soft">{vocabulary.meaning}</p>
        </Link>
        <Badge tone={status.tone} className="shrink-0">
          {status.label}
        </Badge>
      </div>

      {(onEdit || onDelete) && (
        <div className="mt-4 flex items-center gap-1 border-t border-border pt-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {onEdit ? (
            <button
              onClick={() => onEdit(vocabulary)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
            >
              <Pencil className="h-3.5 w-3.5" /> Sửa
            </button>
          ) : null}
          {onDelete ? (
            <button
              onClick={() => onDelete(vocabulary)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-ink-soft transition-colors hover:bg-error-bg hover:text-error"
            >
              <Trash2 className="h-3.5 w-3.5" /> Xoá
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
