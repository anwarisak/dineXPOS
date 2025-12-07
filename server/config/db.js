import mongoose from "mongoose";
import { DATABASE_URL } from "./config.js";

export const ConnectDB = () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log("Connected to the Database ....");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

