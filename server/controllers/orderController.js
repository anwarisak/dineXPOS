import Order from "../models/orderModel.js";
import Tax from "../models/taxModel.js";

// Get all Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Create a new Order

export const createOrder = async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!user || !items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Order must have at least one item" });
    }
    const taxData = await Tax.findOne();

    const subtotal = items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    const tax = Number((subtotal * taxData.rate).toFixed(2));
    const total = Number(tax + subtotal).toFixed(2);

    const newOrder = await Order.create({
      user,
      items,
      tax,
      subtotal,
      total,
    });
    res
      .status(201)
      .json({ success: true, message: "Order created", order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
