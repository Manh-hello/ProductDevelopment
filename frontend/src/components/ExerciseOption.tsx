import { Check, X } from "lucide-react";
import { cn } from "../utils/cn";

type OptionState = "idle" | "selected-correct" | "selected-incorrect" | "reveal-correct" | "dimmed";

interface ExerciseOptionProps {
  label: string;
  state: OptionState;
  onClick: () => void;
  disabled?: boolean;
}

export function ExerciseOption({ label, state, onClick, disabled }: ExerciseOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 text-left text-[15px] font-medium",
        "transition-all duration-150 ease-out",
        state === "idle" &&
          "border-border bg-white text-ink hover:border-primary-300 hover:bg-primary-50/40",
        state === "dimmed" && "border-border bg-white text-ink-faint",
        state === "selected-correct" && "border-success bg-success-bg text-success",
        state === "reveal-correct" && "border-success bg-success-bg text-success",
        state === "selected-incorrect" && "border-error bg-error-bg text-error"
      )}
    >
      <span>{label}</span>
      {state === "selected-correct" || state === "reveal-correct" ? (
        <Check className="h-5 w-5 shrink-0" />
      ) : null}
      {state === "selected-incorrect" ? <X className="h-5 w-5 shrink-0" /> : null}
    </button>
  );
}
