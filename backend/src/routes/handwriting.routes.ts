import express, { Router } from "express";
import { attempts, recognize, status } from "../controllers/handwriting.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import { handwritingRateLimit } from "../middlewares/rateLimit";
import { env } from "../config/env";
import { ACCEPTED_IMAGE_TYPES } from "../services/handwriting.service";

const router = Router();
router.use(authenticateToken);

router.get("/status", status);
router.get("/attempts", attempts);
// Thứ tự: xác thực → giới hạn tần suất → mới đọc body (ảnh thô, không multipart, không base64). Quá `limit` → 413.
router.post(
  "/recognize",
  handwritingRateLimit,
  express.raw({ type: [...ACCEPTED_IMAGE_TYPES], limit: env.HANDWRITING_MAX_IMAGE_BYTES }),
  recognize
);

export default router;
