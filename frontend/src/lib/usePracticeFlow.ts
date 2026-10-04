import { useLocation, useNavigate } from 'react-router-dom';

/** Thứ tự các bài luyện trong một phiên; bài cuối dẫn tới trang kết quả. */
export const PRACTICE_CHAIN = [
  '/practice/multi',
  '/practice/quiz',
  '/practice/reverse-quiz',
  '/practice/pinyin',
  '/practice/sentence-order',
  '/practice/fill-blank',
  '/practice/translation',
  '/practice/translation-hub',
  '/practice/sentence-creation',
  '/practice/writing',
  '/practice/dictation',
  '/practice/listening',
  '/practice/speaking',
  '/practice/result',
];

/** Trả về hàm chuyển sang bài luyện kế tiếp trong phiên. */
export default function usePracticeNext() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return () => {
    const i = PRACTICE_CHAIN.indexOf(pathname);
    navigate(PRACTICE_CHAIN[Math.min(i + 1, PRACTICE_CHAIN.length - 1)] ?? '/practice/result');
  };
}
