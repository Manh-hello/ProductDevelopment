import type { LucideIcon } from "lucide-react";
import { Card } from "./ui/Card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: "primary" | "navy";
}

export function StatCard({ icon: Icon, label, value, tone = "navy" }: StatCardProps) {
  return (
    <Card padding="md" className="flex items-center gap-4">
      <div
        className={
          tone === "primary"
            ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
            : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700"
        }
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xl font-bold leading-tight text-ink">{value}</p>
        <p className="text-sm text-ink-soft">{label}</p>
      </div>
    </Card>
  );
}
