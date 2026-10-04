import NavLinks, { type NavItem, type NavStyle } from './NavLinks';
import { useActiveNavKey } from './navigation';

const NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard & Tổng Quan',
    icon: 'grid_view',
  },
  {
    key: 'vocabulary',
    label: 'Kho Từ Vựng Cá Nhân',
    icon: 'auto_stories',
  },
  {
    key: 'practice',
    label: 'Luyện Tập',
    icon: 'model_training',
  },
  {
    key: 'sentences',
    label: 'Luyện Câu & Phát Âm',
    icon: 'record_voice_over',
  },
  {
    key: 'statistics',
    label: 'Thống Kê & Tiến Độ',
    icon: 'insights',
  },
  {
    key: 'achievements',
    label: 'Thành Tích & Huân Chương',
    icon: 'emoji_events',
  },
  {
    key: 'settings',
    label: 'Cài Đặt',
    icon: 'tune',
  },
];
const NAV_STYLE: NavStyle = {
  inactive:
    'flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all font-title-sm text-title-sm',
  active:
    'flex items-center gap-space-sm px-space-md py-2.5 rounded-lg transition-all bg-primary-container text-on-primary font-bold shadow-sm',
  icon: 'material-symbols-outlined text-[20px]',
  label: '',
};

export default function Sidebar() {
  const active = useActiveNavKey();
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between py-space-lg px-gutter-sm shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-space-lg">
        <div className="px-space-xs">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-xl text-headline-md font-bold shadow-[0_2px_8px_rgba(149,0,42,0.2)]">
              字
            </div>
            <div className="flex flex-col">
              <span className="font-headline-lg text-headline-md font-bold text-on-surface tracking-tight leading-none">
                汉字通
              </span>
              <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase font-bold mt-1">
                HanziSRS
              </span>
            </div>
          </div>
          <div className="mt-space-sm inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>SRS Spaced Repetition
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <NavLinks items={NAV_ITEMS} style={NAV_STYLE} active={active} />
        </nav>
      </div>
      <div className="px-space-xs">
        <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Độ thuần thục SRS
            </span>
            <span className="font-label-sm text-label-sm font-bold text-secondary">68%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex">
            <div className="h-full bg-secondary-fixed-dim" style={{ width: '25%' }}></div>
            <div className="h-full bg-secondary" style={{ width: '35%' }}></div>
            <div className="h-full bg-tertiary" style={{ width: '20%' }}></div>
            <div className="h-full bg-primary" style={{ width: '20%' }}></div>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mt-1">
            <span>HSK 1-6</span>
            <span>1,842 Từ Đã Nhớ</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
