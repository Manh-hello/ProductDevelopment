import { Router } from "express";
import { completeSession, getSessionSummary, listSessions, startSession, submitAnswer } from "../controllers/practice.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.use(authenticateToken);

router.get("/sessions", listSessions);
router.post("/sessions", startSession);
router.get("/sessions/:sessionId", getSessionSummary);
router.post("/sessions/:sessionId/answers", submitAnswer);
router.put("/sessions/:sessionId/complete", completeSession);

export default router;
