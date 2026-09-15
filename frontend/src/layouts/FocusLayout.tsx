import { Outlet, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export function FocusLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="flex items-center px-4 py-4 md:px-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <X className="h-4 w-4" />
          Thoát
        </button>
      </header>
      <main className="flex flex-1 flex-col px-4 pb-10 md:px-8">
        <div className="mx-auto w-full max-w-xl flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
