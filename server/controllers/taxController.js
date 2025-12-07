import Tax from "../models/taxModel.js";
// Create a new tax
export const createTax = async (req, res, next) => {
  try {
    const { rate } = req.body;

    const existing = await Tax.findOne();
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "tax already exists" });
    }
    const newtax = await Tax.create({ rate });
    return res.status(201).json({
      success: true,
      message: "tax created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
