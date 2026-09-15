import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "../utils/cn";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export function SearchBar({ className, containerClassName, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      <input
        type="search"
        className={cn(
          "h-11 w-full rounded-xl border border-border bg-white pl-10 pr-3.5 text-[15px] text-ink placeholder:text-ink-faint",
          "transition-colors duration-150 outline-none",
          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15",
          className
        )}
        {...props}
      />
    </div>
  );
}
