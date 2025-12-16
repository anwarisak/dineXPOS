// middleware/roleMiddleware.js

/**
 * Allow only specific roles
 * @param  {...string} roles
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next(); // role allowed
  };
};
