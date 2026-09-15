import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, RotateCcw, Dumbbell, Settings } from "lucide-react";
import { cn } from "../utils/cn";

const navItems = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/vocabulary", label: "Từ vựng", icon: BookOpen },
  { to: "/review", label: "Ôn tập", icon: RotateCcw },
  { to: "/exercises", label: "Luyện tập", icon: Dumbbell },
  { to: "/settings", label: "Cài đặt", icon: Settings },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-bg-card px-2 py-1.5 md:hidden">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium transition-colors",
              isActive ? "text-primary-600" : "text-ink-faint"
            )
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
