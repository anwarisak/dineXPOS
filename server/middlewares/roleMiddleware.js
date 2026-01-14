// middleware/roleMiddleware.js

/**
 * Allow only specific roles to access a route
 * @param {...string} roles - Allowed roles (e.g. "admin", "user")
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Ensure user exists (protect middleware must run first)
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next(); // Role allowed → continue
  };
};
