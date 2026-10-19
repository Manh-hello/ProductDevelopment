import { env } from "../config/env";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Ngày "địa phương" của người học (theo TZ_OFFSET_MINUTES, mặc định +7 = Việt Nam),
 * biểu diễn bằng 00:00 UTC của ngày đó - khớp cột `DATE` của MySQL/Prisma
 * (`daily_statistics.statistic_date`). Trước đây dùng thẳng UTC nên mốc "hôm nay"
 * lệch 7 tiếng so với người dùng ở Việt Nam (streak/thống kê bị tính sai quanh nửa đêm).
 */
export function startOfDay(date: Date = new Date()): Date {
  const local = new Date(date.getTime() + env.TZ_OFFSET_MINUTES * 60_000);
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()));
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

/** Khoảng thời gian thực [start, end) của ngày địa phương chứa `date` (dùng để lọc cột DATETIME). */
export function localDayBounds(date: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(startOfDay(date).getTime() - env.TZ_OFFSET_MINUTES * 60_000);
  return { start, end: new Date(start.getTime() + DAY_MS) };
}

export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}
