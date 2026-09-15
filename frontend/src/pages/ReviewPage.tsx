import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import { Flashcard } from "../components/Flashcard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Button";
import { dueForReview } from "../data/mockVocabulary";
import type { ReviewRating } from "../types/vocabulary";
import { cn } from "../utils/cn";

const ratingConfig: { key: ReviewRating; label: string; className: string }[] = [
  { key: "again", label: "Again", className: "border-error text-error hover:bg-error-bg" },
  { key: "hard", label: "Hard", className: "border-warning text-warning hover:bg-warning-bg" },
  { key: "good", label: "Good", className: "border-navy-600 text-navy-700 hover:bg-navy-50" },
  { key: "easy", label: "Easy", className: "border-success text-success hover:bg-success-bg" },
];

export default function ReviewPage() {
  const navigate = useNavigate();
  const queue = dueForReview;
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const total = queue.length;
  const current = queue[index];
  const isFinished = index >= total;

  function handleRate(_rating: ReviewRating) {
    // TODO: gửi kết quả lên PUT /api/user-vocabularies/:id ở Phase sau,
    // cập nhật interval/nextReview theo thuật toán SRS.
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  if (total === 0 || isFinished) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg">
          <PartyPopper className="h-7 w-7 text-success" />
        </div>
        <h1 className="text-xl font-bold text-ink">
          {total === 0 ? "Không có từ nào cần ôn" : "Hoàn thành ôn tập!"}
        </h1>
        <p className="max-w-xs text-sm text-ink-soft">
          {total === 0
            ? "Quay lại sau khi có từ vựng đến hạn ôn tập."
            : `Bạn đã ôn xong ${total} từ vựng hôm nay. Tiếp tục duy trì chuỗi ngày học nhé.`}
        </p>
        <Button onClick={() => navigate("/dashboard")} className="mt-2">
          Về Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink-soft">
          <span>Ôn tập</span>
          <span>
            {index + 1} / {total}
          </span>
        </div>
        <ProgressBar value={((index + 1) / total) * 100} />
      </div>

      <Flashcard vocabulary={current} revealed={revealed} onReveal={() => setRevealed(true)} />

      <div
        className={cn(
          "grid grid-cols-4 gap-3 transition-opacity duration-200",
          revealed ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {ratingConfig.map((rating) => (
          <button
            key={rating.key}
            onClick={() => handleRate(rating.key)}
            className={cn(
              "rounded-xl border-2 bg-white py-3 text-sm font-semibold transition-colors duration-150",
              rating.className
            )}
          >
            {rating.label}
          </button>
        ))}
      </div>
    </div>
  );
}
