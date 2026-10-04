import { Link } from 'react-router-dom';
import { NAV_ROUTES, type NavKey } from './navigation';

export interface NavItem {
  key: NavKey;
  label: string;
  icon?: string | null;
}

/** Class của từng trạng thái, lấy nguyên từ thiết kế Stitch của họ sidebar tương ứng. */
export interface NavStyle {
  inactive: string;
  active: string;
  icon?: string;
  label?: string;
}

interface Props {
  items: NavItem[];
  style: NavStyle;
  /** Mục đang highlight, suy ra từ URL hiện tại. */
  active?: NavKey;
}

export default function NavLinks({ items, style, active }: Props) {
  return (
    <>
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            to={NAV_ROUTES[item.key]}
            className={isActive ? style.active : style.inactive}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon && style.icon !== undefined && <span className={style.icon}>{item.icon}</span>}
            {style.label !== undefined ? <span className={style.label || undefined}>{item.label}</span> : item.label}
          </Link>
        );
      })}
    </>
  );
}
