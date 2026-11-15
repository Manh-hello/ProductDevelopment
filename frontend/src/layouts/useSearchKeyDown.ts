import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Ô tìm kiếm ở header: nhấn Enter sẽ mở Thư viện từ vựng (kho chung) và tìm trên TOÀN BỘ thư viện.
 * Không dẫn tới "Kho từ vựng cá nhân" (/vocabulary) — kho đó chỉ chứa từ bạn đã thêm, có ô tìm riêng ngay trong trang.
 */
export default function useSearchKeyDown() {
  const navigate = useNavigate();
  return (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const q = e.currentTarget.value.trim();
    navigate(q ? `/library?q=${encodeURIComponent(q)}` : '/library');
  };
}
