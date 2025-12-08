import { getDailySales } from "../controllers/reportsController.js";
import express from "express";

const routers = express.Router();

routers.get("/", getDailySales);

export default routers;
