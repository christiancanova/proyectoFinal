import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  products: {
    type: Array,
  },
  adress: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Cart", cartSchema);