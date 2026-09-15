import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, rows = 3, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-ink">
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={Boolean(error)}
          className={cn(
            "resize-none rounded-xl border bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint",
            "transition-colors duration-150 outline-none",
            "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15",
            error
              ? "border-error focus:border-error focus:ring-error/15"
              : "border-border",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-sm text-error">{error}</p>
        ) : hint ? (
          <p className="text-sm text-ink-faint">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
