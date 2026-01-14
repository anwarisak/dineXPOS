import Order from "../models/orderModel.js";

export const getDailySales = async (req, res) => {
  try {
    // Get today's start & end time
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const order = await Order.find({
      createdAt: { $gte: start, $lte: end },
    });

    const DailySale = order.reduce((sum, order) => {
      return sum + order.total;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Today's total sales",
      amout: DailySale.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
