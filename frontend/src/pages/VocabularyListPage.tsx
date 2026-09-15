import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, BookX } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { SearchBar } from "../components/SearchBar";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { EmptyState } from "../components/ui/EmptyState";
import { VocabularyTable } from "../components/VocabularyTable";
import { VocabularyCard } from "../components/VocabularyCard";
import { VocabularyCardSkeleton } from "../components/ui/LoadingSkeleton";
import { useToast } from "../components/ui/Toast";
import { mockVocabularies } from "../data/mockVocabulary";
import type { Vocabulary, VocabularyStatus } from "../types/vocabulary";

const PAGE_SIZE = 6;

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "new", label: "Mới" },
  { value: "learning", label: "Đang học" },
  { value: "mastered", label: "Đã thuộc" },
];

const sortOptions = [
  { value: "recent", label: "Mới thêm gần đây" },
  { value: "hanzi", label: "Hán tự (A-Z)" },
];

export default function VocabularyListPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>(mockVocabularies);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VocabularyStatus | "all">("all");
  const [sort, setSort] = useState<"recent" | "hanzi">("recent");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<Vocabulary | null>(null);

  const filtered = useMemo(() => {
    let result = vocabularies.filter((v) => {
      const matchesSearch =
        search.trim() === "" ||
        v.hanzi.includes(search) ||
        v.pinyin.toLowerCase().includes(search.toLowerCase()) ||
        v.meaning.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || v.status === status;
      return matchesSearch && matchesStatus;
    });

    if (sort === "hanzi") {
      result = [...result].sort((a, b) => a.hanzi.localeCompare(b.hanzi, "zh"));
    }

    return result;
  }, [vocabularies, search, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    setVocabularies((prev) => prev.filter((v) => v.id !== pendingDelete.id));
    showToast(`Đã xoá "${pendingDelete.hanzi}"`);
    setPendingDelete(null);
  }

  return (
    <div>
      <PageHeader
        title="Danh sách từ vựng"
        description={`${filtered.length} từ vựng`}
        action={
          <Link to="/vocabulary/new">
            <Button>
              <Plus className="h-4 w-4" />
              Thêm từ mới
            </Button>
          </Link>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <SearchBar
          placeholder="Tìm theo Hán tự, Pinyin, nghĩa..."
          containerClassName="flex-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Select
          options={statusOptions}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as VocabularyStatus | "all");
            setPage(1);
          }}
          className="sm:w-48"
        />
        <Select
          options={sortOptions}
          value={sort}
          onChange={(e) => setSort(e.target.value as "recent" | "hanzi")}
          className="sm:w-48"
        />
      </div>

      {paginated.length === 0 ? (
        <EmptyState
          icon={BookX}
          title="Không tìm thấy từ vựng nào"
          description="Thử thay đổi từ khoá tìm kiếm hoặc bộ lọc, hoặc thêm một từ vựng mới."
          action={
            <Link to="/vocabulary/new">
              <Button variant="secondary" size="sm">
                Thêm từ mới
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          {/* Desktop: table */}
          <div className="hidden md:block">
            <VocabularyTable
              vocabularies={paginated}
              onDelete={setPendingDelete}
              onEdit={(v) => navigate(`/vocabulary/${v.id}/edit`)}
            />
          </div>
          {/* Mobile: cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
            {paginated.map((v) => (
              <VocabularyCard
                key={v.id}
                vocabulary={v}
                onDelete={setPendingDelete}
                onEdit={(vocab) => navigate(`/vocabulary/${vocab.id}/edit`)}
              />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={
                    p === page
                      ? "h-9 w-9 rounded-lg bg-primary-500 text-sm font-semibold text-white"
                      : "h-9 w-9 rounded-lg text-sm font-medium text-ink-soft transition-colors hover:bg-black/5"
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          ) : null}
        </>
      )}

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title={`Xoá "${pendingDelete?.hanzi}"?`}
        description="Từ vựng này sẽ bị xoá khỏi danh sách học của bạn. Không thể hoàn tác."
        footer={
          <>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Huỷ
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Xoá
            </Button>
          </>
        }
      />
    </div>
  );
}

export function VocabularyListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <VocabularyCardSkeleton key={i} />
      ))}
    </div>
  );
}
