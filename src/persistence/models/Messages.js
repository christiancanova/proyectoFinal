import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  date: Date,
  email: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Message", messageSchema);