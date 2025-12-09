import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deleted: {
    type: Number,
    default: 0,
  },
});

const category = mongoose.model("Category", categorySchema);
export default category;
