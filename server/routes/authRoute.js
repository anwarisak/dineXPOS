import express from "express";
import { login } from "../controllers/auth.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Auth routes
router.post("/", loginLimiter, login);

export default router;
