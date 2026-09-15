import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, RotateCcw, Dumbbell, BarChart3, Settings } from "lucide-react";
import { cn } from "../utils/cn";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vocabulary", label: "Vocabulary", icon: BookOpen },
  { to: "/review", label: "Review", icon: RotateCcw },
  { to: "/exercises", label: "Exercises", icon: Dumbbell },
  { to: "/statistics", label: "Statistics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-bg-card px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="font-hanzi text-xl font-bold text-primary-500">学</span>
        <span className="text-[15px] font-bold text-ink">Chinese Vocabulary</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors duration-150",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-ink-soft hover:bg-black/5 hover:text-ink"
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
