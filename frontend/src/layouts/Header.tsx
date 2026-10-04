import { Link, useNavigate } from 'react-router-dom';
import useSearchKeyDown from './useSearchKeyDown';

export default function Header() {
  const navigate = useNavigate();
  const onSearchKeyDown = useSearchKeyDown();
  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface/85 backdrop-blur-xl z-40 px-gutter flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-space-md">
        <div className="relative hidden xl:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            className="w-72 pl-10 pr-space-md py-2 rounded-lg bg-surface-container border-none text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Tra cứu Hán tự, Pinyin, nghĩa..."
            type="text"
            onKeyDown={onSearchKeyDown}
          />
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="h-9 px-3 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-1.5 font-label-md text-label-md shadow-[0_2px_8px_rgba(217,119,6,0.18)]">
            <span className="material-symbols-outlined text-[18px] text-tertiary">local_fire_department</span>
            <span>12 Ngày</span>
          </div>
          <div className="h-9 px-3 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1.5 font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
            <span>2,450 XP</span>
          </div>
          <div
            className="h-9 px-3 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center gap-1.5 font-label-md text-label-md"
            onClick={() => navigate('/review')}
            role="button"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">notifications</span>
            <span>44 Từ cần ôn</span>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-[0_4px_12px_rgba(190,18,60,0.25)] transition-all"
          type="button"
          onClick={() => navigate('/vocabulary/new')}
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Thêm từ mới</span>
        </button>
        <div
          className="flex items-center gap-space-sm pl-space-xs border-l border-surface-container-highest"
          onClick={() => navigate('/settings')}
          role="button"
        >
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="font-title-sm text-title-sm font-bold text-on-surface leading-snug">Minh Quân</span>
            <span className="font-label-sm text-label-sm text-primary font-bold">Lv.5 Học Giả</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
