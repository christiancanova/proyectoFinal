import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  numOrder: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
  },
  state: {
    type: String,
    default: "generada",
  },
  totalPrice: {
    type: Number,
  },
});

export default mongoose.model("Order", orderSchema);