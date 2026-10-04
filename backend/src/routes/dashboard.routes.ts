import { Router } from "express";
import {
  getDashboardSummary,
  getRecentXp,
  getWeakWords,
  getWeeklyActivity,
} from "../controllers/dashboard.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.use(authenticateToken);

router.get("/summary", getDashboardSummary);
router.get("/weak-words", getWeakWords);
router.get("/weekly-activity", getWeeklyActivity);
router.get("/recent-xp", getRecentXp);

export default router;
