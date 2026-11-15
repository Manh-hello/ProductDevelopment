import { Router } from "express";
import {
  createUserSentence,
  deleteUserSentence,
  generateUserSentences,
  listAchievements,
  listTags,
  listUserSentences,
  updateUserSentence,
} from "../controllers/misc.controller";
import { listNotifications, markAllRead, markRead, removeNotification, unreadCount } from "../controllers/notification.controller";
import { overview } from "../controllers/statistics.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import { aiRateLimit } from "../middlewares/rateLimit";

export const tagRoutes = Router();
tagRoutes.use(authenticateToken);
tagRoutes.get("/", listTags);

export const achievementRoutes = Router();
achievementRoutes.use(authenticateToken);
achievementRoutes.get("/", listAchievements);

export const userSentenceRoutes = Router();
userSentenceRoutes.use(authenticateToken);
userSentenceRoutes.get("/", listUserSentences);
userSentenceRoutes.post("/generate", aiRateLimit, generateUserSentences); // xem trước, không ghi DB
userSentenceRoutes.post("/", createUserSentence);
userSentenceRoutes.put("/:id", updateUserSentence);
userSentenceRoutes.delete("/:id", deleteUserSentence);

export const notificationRoutes = Router();
notificationRoutes.use(authenticateToken);
notificationRoutes.get("/", listNotifications);
notificationRoutes.get("/unread-count", unreadCount);
notificationRoutes.post("/read-all", markAllRead);
notificationRoutes.patch("/:id/read", markRead);
notificationRoutes.delete("/:id", removeNotification);

export const statisticsRoutes = Router();
statisticsRoutes.use(authenticateToken);
statisticsRoutes.get("/overview", overview);
