import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Vocabulary } from "../types/vocabulary";
import { Badge } from "./ui/Badge";

const statusConfig = {
  new: { label: "Mới", tone: "primary" as const },
  learning: { label: "Đang học", tone: "warning" as const },
  mastered: { label: "Đã thuộc", tone: "success" as const },
};

interface VocabularyTableProps {
  vocabularies: Vocabulary[];
  onEdit?: (vocabulary: Vocabulary) => void;
  onDelete?: (vocabulary: Vocabulary) => void;
}

export function VocabularyTable({ vocabularies, onEdit, onDelete }: VocabularyTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-card)]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-ink-faint">
            <th className="px-5 py-3.5 font-medium">Hán tự</th>
            <th className="px-5 py-3.5 font-medium">Pinyin</th>
            <th className="px-5 py-3.5 font-medium">Nghĩa</th>
            <th className="hidden px-5 py-3.5 font-medium md:table-cell">Ví dụ</th>
            <th className="px-5 py-3.5 font-medium">Trạng thái</th>
            <th className="px-5 py-3.5 font-medium">
              <span className="sr-only">Hành động</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {vocabularies.map((vocab) => {
            const status = statusConfig[vocab.status];
            return (
              <tr
                key={vocab.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-bg"
              >
                <td className="px-5 py-3.5">
                  <Link to={`/vocabulary/${vocab.id}`} className="font-hanzi text-xl font-semibold text-ink">
                    {vocab.hanzi}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-primary-600">{vocab.pinyin}</td>
                <td className="px-5 py-3.5 text-ink">{vocab.meaning}</td>
                <td className="hidden max-w-[220px] truncate px-5 py-3.5 text-ink-soft md:table-cell">
                  {vocab.example ?? "—"}
                </td>
                <td className="px-5 py-3.5">
                  <Badge tone={status.tone}>{status.label}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    {onEdit ? (
                      <button
                        onClick={() => onEdit(vocab)}
                        aria-label={`Sửa ${vocab.hanzi}`}
                        className="rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-black/5 hover:text-ink"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button
                        onClick={() => onDelete(vocab)}
                        aria-label={`Xoá ${vocab.hanzi}`}
                        className="rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-error-bg hover:text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
