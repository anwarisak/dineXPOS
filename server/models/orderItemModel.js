import mongoose from "mongoose";

const orderItemScheme = new mongoose.Schema({
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

const orderItem = mongoose.model("OrderItem", orderItemScheme);
export default orderItem;
