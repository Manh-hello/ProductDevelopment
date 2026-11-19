import { useLocation } from 'react-router-dom';

export type NavKey =
  | 'dashboard'
  | 'vocabulary'
  | 'library'
  | 'practice'
  | 'sentences'
  | 'speaking'
  | 'statistics'
  | 'achievements'
  | 'settings';

/** Route đích của từng mục sidebar. */
export const NAV_ROUTES: Record<NavKey, string> = {
  dashboard: '/dashboard',
  vocabulary: '/vocabulary',
  library: '/library',
  practice: '/practice',
  sentences: '/sentences',
  speaking: '/practice/speaking',
  statistics: '/statistics',
  achievements: '/achievements',
  settings: '/settings',
};

/**
 * Mục sidebar nào "sở hữu" mỗi nhóm route (theo tiền tố), dùng để highlight đồng bộ với URL.
 * Khi nhiều tiền tố cùng khớp, tiền tố DÀI NHẤT thắng - nên route cụ thể (/practice/speaking, /practice/fill-blank...)
 * được xét trước tiền tố tổng quát /practice. Các route /practice/* còn lại (quiz, pinyin, nghe, ôn tập...) thuộc "Luyện Tập".
 */
const OWNERS: [prefix: string, key: NavKey][] = [
  ['/dashboard', 'dashboard'],
  ['/vocabulary', 'vocabulary'],
  ['/library', 'library'],
  ['/learn', 'library'],
  ['/practice', 'practice'],
  ['/review', 'practice'],
  // Luyện Câu
  ['/sentences', 'sentences'],
  ['/practice/fill-blank', 'sentences'],
  ['/practice/sentence-order', 'sentences'],
  ['/practice/translation', 'sentences'],
  ['/practice/translation-hub', 'sentences'],
  ['/practice/sentence-creation', 'sentences'],
  ['/practice/saved-sentences', 'sentences'],
  // Luyện Phát Âm
  ['/practice/speaking', 'speaking'],
  ['/statistics', 'statistics'],
  ['/achievements', 'achievements'],
  ['/settings', 'settings'],
];

export function navKeyForPath(pathname: string): NavKey | undefined {
  let best: { len: number; key: NavKey } | undefined;
  for (const [p, key] of OWNERS) {
    if ((pathname === p || pathname.startsWith(p + '/')) && (!best || p.length > best.len)) best = { len: p.length, key };
  }
  return best?.key;
}

/** Trang gốc của khu vực chứa `pathname` (dùng cho nút thoát / "luyện tiếp"). Phát âm không có trang hub riêng nên quay về /practice. */
export function sectionHome(pathname: string | undefined): string {
  const key = pathname ? navKeyForPath(pathname) : undefined;
  return key === 'sentences' ? '/sentences' : '/practice';
}

/** Các trang kết quả dùng chung cho nhiều khu vực: giữ nguyên mục nav của trang đã dẫn tới (qua location.state.navFrom). */
const SHARED_RESULT_PATHS = ['/practice/result', '/review/complete'];

export function useActiveNavKey(): NavKey | undefined {
  const { pathname, state } = useLocation();
  const navFrom = SHARED_RESULT_PATHS.includes(pathname) ? (state as { navFrom?: string } | null)?.navFrom : undefined;
  return navKeyForPath(navFrom ?? pathname);
}
