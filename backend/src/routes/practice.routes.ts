import { Router } from "express";
import { completeSession, startSession, submitAnswer } from "../controllers/practice.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.use(authenticateToken);

router.post("/sessions", startSession);
router.post("/sessions/:sessionId/answers", submitAnswer);
router.put("/sessions/:sessionId/complete", completeSession);

export default router;
