import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    default: 0.02, // 2%
  },
});

const Tax = mongoose.model("Tax", taxSchema);

export default Tax;
