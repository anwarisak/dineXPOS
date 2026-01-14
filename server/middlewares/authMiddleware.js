// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Verify JWT from cookie and attach user to request
 */
export const protect = async (req, res, next) => {
  try {
    // Ensure cookies exist (cookie-parser must be enabled)
    const token = req.cookies?.token;

    // No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and exclude password
    const user = await User.findById(decoded.id).select("-password");

    // User no longer exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Attach user to request
    req.user = user;

    next(); // Proceed to next middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};
