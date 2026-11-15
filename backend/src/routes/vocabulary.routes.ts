import { Router } from "express";
import {
  createVocabulary,
  deleteVocabulary,
  getVocabulary,
  getVocabularyProgress,
  aiLookupVocabulary,
  listVocabularies,
  lookupVocabulary,
  updateVocabulary,
} from "../controllers/vocabulary.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import { aiRateLimit } from "../middlewares/rateLimit";

const router = Router();
router.use(authenticateToken);

router.get("/", listVocabularies);
router.get("/lookup", lookupVocabulary); // phải đứng trước "/:id"
router.post("/ai-lookup", aiRateLimit, aiLookupVocabulary); // gợi ý bằng AI, không ghi DB
router.get("/:id", getVocabulary);
router.get("/:id/progress", getVocabularyProgress);
router.post("/", createVocabulary);
router.put("/:id", updateVocabulary);
router.delete("/:id", deleteVocabulary);

export default router;
