import { useLocation } from 'react-router-dom';

export type NavKey = 'dashboard' | 'vocabulary' | 'practice' | 'sentences' | 'statistics' | 'achievements' | 'settings';

/** Route đích của từng mục sidebar. */
export const NAV_ROUTES: Record<NavKey, string> = {
  dashboard: '/dashboard',
  vocabulary: '/vocabulary',
  practice: '/practice',
  sentences: '/sentences',
  statistics: '/statistics',
  achievements: '/achievements',
  settings: '/settings',
};

/** Mục sidebar nào "sở hữu" mỗi nhóm route (theo tiền tố), dùng để highlight đồng bộ với URL. */
const OWNERS: [prefix: string, key: NavKey][] = [
  ['/dashboard', 'dashboard'],
  ['/vocabulary', 'vocabulary'],
  ['/practice', 'practice'],
  ['/review', 'practice'],
  ['/sentences', 'sentences'],
  ['/statistics', 'statistics'],
  ['/achievements', 'achievements'],
  ['/settings', 'settings'],
];

export function useActiveNavKey(): NavKey | undefined {
  const { pathname } = useLocation();
  return OWNERS.find(([p]) => pathname === p || pathname.startsWith(p + '/'))?.[1];
}
