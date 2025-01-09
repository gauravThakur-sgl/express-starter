import express from "express";
import {
 checkAuth,
 login,
 logout,
 signup,
} from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-auth", checkAuth, requireAuth);
router.get("/logout", logout);

export default router;
