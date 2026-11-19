import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

/** Ô tìm kiếm ở header: nhấn Enter sẽ mở Kho từ vựng với từ khóa tương ứng. */
export default function useSearchKeyDown() {
  const navigate = useNavigate();
  return (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const q = e.currentTarget.value.trim();
    navigate(q ? `/vocabulary?q=${encodeURIComponent(q)}` : '/vocabulary');
  };
}
