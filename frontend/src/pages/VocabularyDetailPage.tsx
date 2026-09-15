import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileQuestion, Pencil, Volume2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { mockVocabularies } from "../data/mockVocabulary";

const statusConfig = {
  new: { label: "Mới", tone: "primary" as const },
  learning: { label: "Đang học", tone: "warning" as const },
  mastered: { label: "Đã thuộc", tone: "success" as const },
};

export default function VocabularyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vocabulary = mockVocabularies.find((v) => v.id === id);

  if (!vocabulary) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="Không tìm thấy từ vựng"
        description="Từ vựng này có thể đã bị xoá."
        action={
          <Button variant="secondary" size="sm" onClick={() => navigate("/vocabulary")}>
            Về danh sách từ vựng
          </Button>
        }
      />
    );
  }

  const status = statusConfig[vocabulary.status];

  return (
    <div className="mx-auto max-w-xl">
      <Link
        to="/vocabulary"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Danh sách từ vựng
      </Link>

      <Card padding="lg">
        <div className="flex items-start justify-between">
          <Badge tone={status.tone}>{status.label}</Badge>
          <Link to={`/vocabulary/${vocabulary.id}/edit`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-3.5 w-3.5" />
              Sửa
            </Button>
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <p className="font-hanzi text-6xl font-semibold text-ink">{vocabulary.hanzi}</p>
          <button
            aria-label="Phát âm"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-colors hover:bg-navy-100"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-4 text-lg font-medium text-primary-600">{vocabulary.pinyin}</p>
        <p className="mt-1 text-xl font-semibold text-ink">{vocabulary.meaning}</p>

        {vocabulary.example ? (
          <div className="mt-6 rounded-xl bg-bg px-5 py-4">
            <p className="text-xs font-medium text-ink-faint">Câu ví dụ</p>
            <p className="font-hanzi mt-2 text-lg text-ink">{vocabulary.example}</p>
            <p className="mt-1 text-sm text-primary-600">{vocabulary.examplePinyin}</p>
            <p className="mt-1 text-sm text-ink-soft">{vocabulary.exampleMeaning}</p>
          </div>
        ) : null}

        {vocabulary.notes ? (
          <div className="mt-4">
            <p className="text-xs font-medium text-ink-faint">Ghi chú</p>
            <p className="mt-1 text-sm text-ink-soft">{vocabulary.notes}</p>
          </div>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
          <div>
            <dt className="text-ink-faint">Ngày học</dt>
            <dd className="mt-0.5 font-medium text-ink">{vocabulary.learnedAt ?? "Chưa học"}</dd>
          </div>
          <div>
            <dt className="text-ink-faint">Ôn tập kế tiếp</dt>
            <dd className="mt-0.5 font-medium text-ink">{vocabulary.nextReviewAt ?? "—"}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
