import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);