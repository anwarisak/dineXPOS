import { createTax } from "../controllers/taxController.js";
import express from "express";

const router = express.Router();

router.post("/", createTax);

export default router;
