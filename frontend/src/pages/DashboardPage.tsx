import { Link } from "react-router-dom";
import { BookOpen, Flame, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CircularProgress } from "../components/ui/ProgressBar";
import { StatCard } from "../components/StatCard";
import { WeeklyChart } from "../components/WeeklyChart";
import { weeklyActivity } from "../data/mockActivity";
import { dueForReview, mockVocabularies } from "../data/mockVocabulary";

const DAILY_GOAL = 20;
const WORDS_TODAY = 12;

export default function DashboardPage() {
  const recent = mockVocabularies.slice(0, 4);
  const toReview = dueForReview.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero / greeting */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">Chào buổi sáng, Mạnh 👋</h1>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            Hôm nay chúng ta học thêm một chút tiếng Trung nhé.
          </p>
        </div>
        <Link to="/exercises">
          <Button size="lg" className="w-full sm:w-auto">
            Bắt đầu học
          </Button>
        </Link>
      </div>

      {/* Progress + stats */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card padding="lg" className="flex items-center gap-6 lg:col-span-1">
          <CircularProgress
            value={(WORDS_TODAY / DAILY_GOAL) * 100}
            label={`${WORDS_TODAY}/${DAILY_GOAL}`}
            sublabel="từ hôm nay"
          />
          <div>
            <p className="text-sm font-semibold text-ink">Mục tiêu hôm nay</p>
            <p className="mt-1 text-sm text-ink-soft">
              Còn {DAILY_GOAL - WORDS_TODAY} từ nữa là hoàn thành mục tiêu.
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <StatCard icon={BookOpen} label="Từ đã học" value={128} tone="primary" />
          <StatCard icon={Sparkles} label="Từ học hôm nay" value={WORDS_TODAY} />
          <StatCard icon={Flame} label="Chuỗi ngày học" value="7 ngày" tone="primary" />
          <StatCard icon={RotateCcw} label="Chờ ôn tập" value={24} />
        </div>
      </div>

      {/* Weekly activity */}
      <Card padding="lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Hoạt động trong tuần</h2>
          <span className="text-sm text-ink-faint">72 từ tuần này</span>
        </div>
        <WeeklyChart data={weeklyActivity} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Review due */}
        <Card padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Đến lúc ôn tập</h2>
            <Link to="/review" className="text-sm font-semibold text-primary-600 hover:underline">
              Ôn ngay
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {toReview.map((word) => (
              <li key={word.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-hanzi text-xl font-semibold text-ink">{word.hanzi}</span>
                  <span className="text-sm text-primary-600">{word.pinyin}</span>
                </div>
                <span className="text-sm text-ink-soft">{word.meaning}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recently learned */}
        <Card padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Từ vựng gần đây</h2>
            <Link to="/vocabulary" className="text-sm font-semibold text-primary-600 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {recent.map((word) => (
              <li key={word.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-hanzi text-xl font-semibold text-ink">{word.hanzi}</span>
                  <span className="text-sm text-primary-600">{word.pinyin}</span>
                </div>
                <span className="text-sm text-ink-soft">{word.meaning}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
