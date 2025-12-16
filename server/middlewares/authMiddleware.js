// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Verify JWT and attach user to request
 */
export const protect = async (req, res, next) => {
  try {
    // Read token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    next(); // continue
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};
