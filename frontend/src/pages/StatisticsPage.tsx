import { BookOpen, Flame, Target, TrendingUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/StatCard";
import { WeeklyChart } from "../components/WeeklyChart";
import { weeklyActivity } from "../data/mockActivity";
import { mockVocabularies } from "../data/mockVocabulary";

export default function StatisticsPage() {
  const mastered = mockVocabularies.filter((v) => v.status === "mastered").length;
  const learning = mockVocabularies.filter((v) => v.status === "learning").length;
  const total = mockVocabularies.length;

  return (
    <div>
      <PageHeader title="Thống kê" description="Theo dõi tiến trình học tập của bạn." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Tổng từ vựng" value={total} tone="primary" />
        <StatCard icon={TrendingUp} label="Đang học" value={learning} />
        <StatCard icon={Target} label="Đã thuộc" value={mastered} />
        <StatCard icon={Flame} label="Chuỗi ngày học" value="7 ngày" tone="primary" />
      </div>

      <Card padding="lg" className="mt-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Hoạt động 7 ngày qua</h2>
          <span className="text-sm text-ink-faint">72 từ</span>
        </div>
        <WeeklyChart data={weeklyActivity} />
      </Card>

      <Card padding="lg" className="mt-6">
        <h2 className="mb-4 text-base font-semibold text-ink">Mức độ ghi nhớ</h2>
        <div className="flex flex-col gap-3">
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-ink-soft">Đã thuộc</span>
              <span className="font-medium text-ink">{mastered}/{total}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-navy-50">
              <div
                className="h-full rounded-full bg-success transition-[width] duration-500"
                style={{ width: `${(mastered / total) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-ink-soft">Đang học</span>
              <span className="font-medium text-ink">{learning}/{total}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-navy-50">
              <div
                className="h-full rounded-full bg-warning transition-[width] duration-500"
                style={{ width: `${(learning / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
