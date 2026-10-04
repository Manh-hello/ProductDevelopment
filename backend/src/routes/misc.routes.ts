import { Router } from "express";
import {
  createUserSentence,
  deleteUserSentence,
  listAchievements,
  listTags,
  listUserSentences,
  updateUserSentence,
} from "../controllers/misc.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

export const tagRoutes = Router();
tagRoutes.use(authenticateToken);
tagRoutes.get("/", listTags);

export const achievementRoutes = Router();
achievementRoutes.use(authenticateToken);
achievementRoutes.get("/", listAchievements);

export const userSentenceRoutes = Router();
userSentenceRoutes.use(authenticateToken);
userSentenceRoutes.get("/", listUserSentences);
userSentenceRoutes.post("/", createUserSentence);
userSentenceRoutes.put("/:id", updateUserSentence);
userSentenceRoutes.delete("/:id", deleteUserSentence);
