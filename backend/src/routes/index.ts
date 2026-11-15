import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import vocabularyRoutes from "./vocabulary.routes";
import userVocabularyRoutes from "./userVocabulary.routes";
import practiceRoutes from "./practice.routes";
import dashboardRoutes from "./dashboard.routes";
import pinyinRoutes from "./pinyin.routes";
import catalogRoutes from "./catalog.routes";
import { achievementRoutes, notificationRoutes, statisticsRoutes, tagRoutes, userSentenceRoutes } from "./misc.routes";

/**
 * Router gốc, mount dưới /api trong app.ts.
 */
const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/vocabularies", vocabularyRoutes);
router.use("/user-vocabularies", userVocabularyRoutes);
router.use("/practice", practiceRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/pinyin", pinyinRoutes);
router.use("/catalog", catalogRoutes);
router.use("/tags", tagRoutes);
router.use("/achievements", achievementRoutes);
router.use("/user-sentences", userSentenceRoutes);
router.use("/notifications", notificationRoutes);
router.use("/statistics", statisticsRoutes);

export default router;
