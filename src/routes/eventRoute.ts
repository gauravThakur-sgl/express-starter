const express = require("express");
import { createEvent } from "../controllers/eventController";
import { requireAuth } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", requireAuth, createEvent);

export default router;
