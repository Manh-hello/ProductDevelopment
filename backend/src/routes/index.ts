import { Router } from "express";
import healthRoutes from "./health.routes";

/**
 * Router gốc, mount dưới /api trong app.ts.
 *
 * Phase 3 sẽ thêm:
 *   router.use("/auth", authRoutes);
 * Phase 4 sẽ thêm:
 *   router.use("/vocabularies", vocabularyRoutes);
 *   router.use("/user-vocabularies", userVocabularyRoutes);
 */
const router = Router();

router.use("/health", healthRoutes);

export default router;
