import { Router } from "express";
import { enroll, overview, word, words } from "../controllers/catalog.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import { optionalAuth } from "../middlewares/optionalAuth";

const router = Router();

// Công khai (khách xem được thư viện từ vựng trên trang chủ); có token thì kèm tiến độ cá nhân.
router.get("/overview", optionalAuth, overview);
router.get("/words", optionalAuth, words);
router.get("/words/:id", optionalAuth, word);

// Cần đăng nhập.
router.post("/enroll", authenticateToken, enroll);

export default router;
