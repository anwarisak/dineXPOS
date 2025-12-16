import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ deleted: 0 });
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get one user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, deleted: 0 });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Register new user
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, role, password } = req.body;

    const usernameLower = username.toLowerCase();
    const emailLower = email.toLowerCase();

    const userExists = await User.findOne({
      $or: [{ username: usernameLower }, { email: emailLower }],
    });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = await User.create({
      username: usernameLower,
      email: emailLower,
      role,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Hash password if it's being updated
    if (req.body.password) {
      const salt = await bcrypt.genSalt(12);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { deleted: 1 }, // mark as deleted
      { new: true }
    );
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
