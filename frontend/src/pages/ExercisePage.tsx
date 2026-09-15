import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, PartyPopper } from "lucide-react";
import { ProgressBar } from "../components/ui/ProgressBar";
import { ExerciseOption } from "../components/ExerciseOption";
import { Button } from "../components/ui/Button";
import { mockExerciseQuestions } from "../data/mockVocabulary";
import { cn } from "../utils/cn";

export default function ExercisePage() {
  const navigate = useNavigate();
  const questions = mockExerciseQuestions;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const total = questions.length;
  const isFinished = index >= total;
  const current = questions[index];

  function handleSelect(option: string) {
    if (selected) return; // đã trả lời rồi, khoá lại
    setSelected(option);
    if (option === current.correctAnswer) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
          <PartyPopper className="h-7 w-7 text-primary-500" />
        </div>
        <h1 className="text-xl font-bold text-ink">Hoàn thành bài luyện tập!</h1>
        <p className="text-sm text-ink-soft">
          Bạn trả lời đúng {score}/{total} câu.
        </p>
        <Button onClick={() => navigate("/dashboard")} className="mt-2">
          Về Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink-soft">
          <span>
            Câu {index + 1} / {total}
          </span>
          <span>Điểm: {score}</span>
        </div>
        <ProgressBar value={(index / total) * 100} />
      </div>

      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <button
          aria-label="Phát âm"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-colors hover:bg-navy-100"
        >
          <Volume2 className="h-5 w-5" />
        </button>
        <p className="font-hanzi text-7xl font-semibold text-ink">{current.hanzi}</p>
        <p className={cn("text-base text-ink-soft", !selected && "invisible")}>{current.pinyin}</p>
        <p className="text-lg font-medium text-ink">{current.prompt}</p>
      </div>

      <div className="flex flex-col gap-3">
        {current.options.map((option) => {
          let state: "idle" | "selected-correct" | "selected-incorrect" | "reveal-correct" | "dimmed" =
            "idle";
          if (selected) {
            if (option === current.correctAnswer) state = "reveal-correct";
            else if (option === selected) state = "selected-incorrect";
            else state = "dimmed";
          }
          return (
            <ExerciseOption
              key={option}
              label={option}
              state={state}
              disabled={Boolean(selected)}
              onClick={() => handleSelect(option)}
            />
          );
        })}
      </div>

      <Button
        onClick={handleNext}
        disabled={!selected}
        size="lg"
        className={cn("w-full transition-opacity", !selected && "pointer-events-none opacity-0")}
      >
        Câu tiếp theo
      </Button>
    </div>
  );
}
