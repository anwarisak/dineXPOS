import express from "express";

import {
  getUsers,
  registerUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { userValidate } from "../middlewares/validate.js";

const router = express.Router();

// User routes
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", userValidate, registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
