import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 requests
  skipSuccessfulRequests: true,
  message: {
    status: 429,
    error: "Too many login attempts",
    message: "Please try again after 5 minutes",
  },
});
