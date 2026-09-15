import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="font-hanzi text-2xl font-bold text-primary-500">学</span>
          <span className="text-lg font-bold text-ink">Chinese Vocabulary</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
