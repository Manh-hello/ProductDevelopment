import { Router } from "express";
import {
  createVocabulary,
  deleteVocabulary,
  getVocabulary,
  listVocabularies,
  updateVocabulary,
} from "../controllers/vocabulary.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

// Toàn bộ API vocabulary yêu cầu đăng nhập (đúng định hướng PRD: đây là
// kho từ vựng cá nhân hoá theo user, không phải danh sách công khai).
router.use(authenticateToken);

router.get("/", listVocabularies);
router.get("/:id", getVocabulary);
router.post("/", createVocabulary);
router.put("/:id", updateVocabulary);
router.delete("/:id", deleteVocabulary);

export default router;
