import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

/** Thanh điều hướng gọn cho các trang công khai (trang chủ, thư viện từ vựng khi chưa đăng nhập). */
export default function PublicHeader() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[80rem] mx-auto px-gutter-sm sm:px-gutter h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-md font-bold shadow-[0_2px_8px_rgba(149,0,42,0.2)]">字</div>
          <div className="flex flex-col leading-none">
            <span className="font-headline-md font-bold text-on-surface tracking-tight">汉字通</span>
            <span className="font-label-sm text-primary tracking-wider uppercase font-bold mt-0.5">HanziSRS</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-space-lg font-title-sm text-on-surface-variant">
          <Link to="/library" className="hover:text-on-surface transition-colors">Thư viện từ vựng</Link>
          <a href="/#six-dimensions" className="hover:text-on-surface transition-colors">Phương pháp 6D</a>
        </nav>
        <div className="flex items-center gap-space-sm">
          {user ? (
            <Link to="/dashboard" className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold hover:bg-primary transition-colors">Vào ứng dụng</Link>
          ) : (
            <>
              <Link to="/library" className="md:hidden px-3 py-2 rounded-lg bg-surface-container text-on-surface font-title-sm">Từ vựng</Link>
              <Link to="/auth" className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold hover:bg-primary transition-colors">Đăng nhập</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
