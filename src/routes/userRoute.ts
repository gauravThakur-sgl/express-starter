const express = require("express");
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
router.get("/check-auth", requireAuth, checkAuth);
router.get("/logout", logout);

// module.exports = router;
// export { router as userRouter };
export default router;
