import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    image: { type: String, required: true, default: "None" },

    sizes: {
      type: [String],
      enum: ["Small", "Medium", "Large"], // e.g. ["Small", "Medium", "Large"]
      default: [],
    },

    addons: {
      type: [String], // e.g. ["Extra Milk", "Caramel Syrup"]
      default: [],
    },

    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

export default Product;
