import { Router } from "express";
import {
  claimDailyChallenge,
  getDailyChallenge,
  getDashboardSummary,
  getReviewForecast,
  getSkills,
  getVocabularyGrowth,
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
router.get("/skills", getSkills);
router.get("/vocabulary-growth", getVocabularyGrowth);
router.get("/daily-challenge", getDailyChallenge);
router.post("/daily-challenge/claim", claimDailyChallenge);
router.get("/review-forecast", getReviewForecast);

export default router;
