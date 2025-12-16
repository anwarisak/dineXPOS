import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        messsage: "password must be at least 6 digit",
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true, // protects against XSS
      secure: false, // change to true when using HTTPS
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
