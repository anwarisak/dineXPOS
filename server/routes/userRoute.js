import express from "express";
import {
  getUsers,
  registerUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// User routes
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
