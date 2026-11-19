import { Router } from "express";
import { changePassword, deleteMe, exportMe, forgotPassword, login, me, register, resetPassword, updateMe } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import { forgotPasswordRateLimit, resetPasswordRateLimit } from "../middlewares/rateLimit";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordRateLimit, forgotPassword);
router.post("/reset-password", resetPasswordRateLimit, resetPassword);
router.get("/me", authenticateToken, me);
router.put("/me", authenticateToken, updateMe);
router.delete("/me", authenticateToken, deleteMe);
router.put("/password", authenticateToken, changePassword);
router.get("/export", authenticateToken, exportMe);

export default router;
