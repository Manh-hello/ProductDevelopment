import { z } from "zod";

export const listNotificationsQuerySchema = z.object({
  category: z.enum(["srs", "achievement", "ai", "system"]).optional(),
  unread: z.enum(["true", "false"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});
