import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import {categoryValidate} from "../middlewares/validate.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", categoryValidate, createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
