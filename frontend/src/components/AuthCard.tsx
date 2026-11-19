import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/** Khung trang xác thực gọn (quên / đặt lại mật khẩu), cùng phong cách với AuthPage. */
export default function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-space-lg">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg">
        <Link to="/" className="flex items-center gap-2 self-start">
          <span className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">漢</span>
          <span className="font-title-md text-title-md font-bold text-primary">HanziSRS</span>
        </Link>
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface">{title}</h1>
          {subtitle && <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

export const inputClass =
  'w-full bg-surface-container-low text-on-surface rounded-xl px-4 py-3 font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container';
export const primaryBtn =
  'w-full px-space-md py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm disabled:opacity-60 disabled:cursor-not-allowed';
