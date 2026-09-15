import { Bell } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Topbar() {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-bg-card px-4 py-3 md:px-8 md:py-4">
      <SearchBar
        placeholder="Tìm từ vựng..."
        containerClassName="hidden max-w-xs flex-1 sm:block"
      />
      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Thông báo"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-700 text-sm font-semibold text-white">
          M
        </div>
      </div>
    </header>
  );
}
