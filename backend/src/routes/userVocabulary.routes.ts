import { Router } from "express";
import {
  addUserVocabulary,
  getUserVocabulary,
  listUserVocabularies,
  removeUserVocabulary,
} from "../controllers/userVocabulary.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.use(authenticateToken);

router.get("/", listUserVocabularies);
router.get("/:id", getUserVocabulary);
router.post("/:vocabularyId", addUserVocabulary);
router.delete("/:vocabularyId", removeUserVocabulary);

export default router;
