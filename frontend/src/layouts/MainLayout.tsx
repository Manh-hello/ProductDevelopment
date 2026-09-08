import { Link, Outlet } from "react-router-dom";

/**
 * Layout dùng chung cho toàn bộ app.
 * Nav ở đây chỉ để dễ điều hướng thủ công giữa các page placeholder
 * trong Phase 2 - Phase 3 sẽ thay bằng nav thật (ẩn/hiện theo login state).
 */
export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3 text-sm">
          <span className="font-semibold text-gray-800">
            Chinese Vocabulary
          </span>
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link to="/vocabulary" className="text-gray-600 hover:text-gray-900">
            Vocabulary
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link to="/register" className="text-gray-600 hover:text-gray-900">
            Register
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
