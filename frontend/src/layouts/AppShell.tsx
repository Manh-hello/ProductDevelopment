import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

/** Shell duy nhất của ứng dụng: sidebar cố định bên trái + header + vùng nội dung. */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="pl-72">
        <Header />
        <main className="w-full pt-20 bg-background min-h-screen px-gutter py-space-lg">{children}</main>
      </div>
    </>
  );
}
