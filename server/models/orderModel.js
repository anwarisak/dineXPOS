import mongoose from "mongoose";

const OrderItemScheme = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // should match your model name
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // minimum 1 makes sense for orders
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // should match your model name exactly
      required: true,
    },

    items: [OrderItemScheme],
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    deleted: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
