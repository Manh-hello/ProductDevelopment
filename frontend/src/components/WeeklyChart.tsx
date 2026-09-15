interface WeeklyChartProps {
  data: { day: string; words: number }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const max = Math.max(...data.map((d) => d.words), 1);
  const today = data.length - 1;

  return (
    <div className="flex h-40 items-end gap-3 md:gap-5">
      {data.map((item, index) => {
        const heightPct = (item.words / max) * 100;
        const isToday = index === today;
        return (
          <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end">
              <div
                className={
                  isToday
                    ? "w-full rounded-lg bg-primary-500 transition-[height] duration-500 ease-out"
                    : "w-full rounded-lg bg-navy-100 transition-[height] duration-500 ease-out"
                }
                style={{ height: `${heightPct}%` }}
                title={`${item.words} từ`}
              />
            </div>
            <span className={isToday ? "text-xs font-semibold text-primary-600" : "text-xs text-ink-faint"}>
              {item.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}
