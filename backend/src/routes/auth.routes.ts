import { Router } from "express";
import { changePassword, deleteMe, exportMe, login, me, register, updateMe } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, me);
router.put("/me", authenticateToken, updateMe);
router.delete("/me", authenticateToken, deleteMe);
router.put("/password", authenticateToken, changePassword);
router.get("/export", authenticateToken, exportMe);

export default router;
