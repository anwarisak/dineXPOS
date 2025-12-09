import express from "express";

import {
  createOrder,
  getOrders,
  getOrdersById,
} from "../controllers/orderController.js";
//
const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrdersById);

export default router;
