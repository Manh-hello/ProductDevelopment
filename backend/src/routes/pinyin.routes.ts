import { Router } from "express";
import { convertPinyin } from "../controllers/pinyin.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();
router.use(authenticateToken);
router.post("/convert", convertPinyin);

export default router;
