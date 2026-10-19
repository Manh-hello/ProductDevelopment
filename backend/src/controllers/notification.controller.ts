import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { listNotificationsQuerySchema } from "../validators/notification.validator";
import * as service from "../services/notification.service";
import { AuthRequest } from "../types/express";

const uid = (req: Request) => (req as AuthRequest).user.id;

export const listNotifications = asyncHandler(async (req: Request, res: Response) => {
  const q = parseOrThrow(listNotificationsQuerySchema, req.query);
  ok(res, await service.listNotifications(uid(req), { category: q.category, unreadOnly: q.unread === "true", limit: q.limit }), 200);
});

export const unreadCount = asyncHandler(async (req: Request, res: Response) => {
  ok(res, { unread: await service.getUnreadCount(uid(req)) }, 200);
});

export const markRead = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await service.markNotificationRead(uid(req), req.params.id), 200);
});

export const markAllRead = asyncHandler(async (req: Request, res: Response) => {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  ok(res, await service.markAllRead(uid(req), category), 200);
});

export const removeNotification = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteNotification(uid(req), req.params.id);
  ok(res, { id: req.params.id }, 200);
});
