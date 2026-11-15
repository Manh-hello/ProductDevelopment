import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

export type NotificationCategory = "srs" | "achievement" | "ai" | "system";

const DUE_REMINDER_COOLDOWN_MS = 8 * 60 * 60 * 1000;

export async function createNotification(
  userId: string,
  data: { category: NotificationCategory; title: string; body?: string; link?: string }
) {
  return prisma.notification.create({ data: { userId, ...data } });
}

/**
 * Nhắc ôn SRS "lười" (lazy): không có job nền, nên khi người dùng mở danh sách thông báo,
 * nếu có từ đến hạn và chưa có nhắc nhở nào trong vài giờ gần đây thì tạo mới.
 */
export async function ensureDueReminder(userId: string): Promise<void> {
  const now = new Date();
  const dueCount = await prisma.userVocabulary.count({ where: { userId, nextReviewAt: { lte: now } } });
  if (dueCount === 0) return;

  const recent = await prisma.notification.findFirst({
    where: { userId, category: "srs", createdAt: { gte: new Date(now.getTime() - DUE_REMINDER_COOLDOWN_MS) } },
  });
  if (recent) return;

  await createNotification(userId, {
    category: "srs",
    title: `Có ${dueCount} từ đang đến hạn ôn tập`,
    body: "Ôn đúng lúc giúp thuật toán SRS củng cố trí nhớ dài hạn và giữ vững chuỗi ngày học.",
    link: "/review",
  });
}

export async function listNotifications(
  userId: string,
  opts: { category?: string; unreadOnly?: boolean; limit: number }
) {
  await ensureDueReminder(userId);

  const where = {
    userId,
    ...(opts.category ? { category: opts.category } : {}),
    ...(opts.unreadOnly ? { isRead: false } : {}),
  };

  const [items, grouped, unreadTotal, total] = await Promise.all([
    prisma.notification.findMany({ where, orderBy: { createdAt: "desc" }, take: opts.limit }),
    prisma.notification.groupBy({ by: ["category"], where: { userId }, _count: { _all: true } }),
    prisma.notification.count({ where: { userId, isRead: false } }),
    prisma.notification.count({ where: { userId } }),
  ]);

  const counts: Record<string, number> = { all: total };
  for (const g of grouped as { category: string; _count: { _all: number } }[]) counts[g.category] = g._count._all;

  return { items, counts, unreadTotal };
}

export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({ where: { userId, isRead: false } });
}

export async function markNotificationRead(userId: string, id: string) {
  const found = await prisma.notification.findFirst({ where: { id, userId } });
  if (!found) throw new AppError("Không tìm thấy thông báo.", 404);
  return prisma.notification.update({ where: { id }, data: { isRead: true } });
}

export async function markAllRead(userId: string, category?: string) {
  const result = await prisma.notification.updateMany({
    where: { userId, isRead: false, ...(category ? { category } : {}) },
    data: { isRead: true },
  });
  return { updated: result.count };
}

export async function deleteNotification(userId: string, id: string) {
  const found = await prisma.notification.findFirst({ where: { id, userId } });
  if (!found) throw new AppError("Không tìm thấy thông báo.", 404);
  await prisma.notification.delete({ where: { id } });
}
