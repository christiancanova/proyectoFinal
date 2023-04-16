import Order from "../persistence/models/Order.js";

export const validateNumOrder = async (numOrder) => {
  const order = await Order.findOne({ numOrder });
  if (!order) {
    throw new Error("No existe una orden con el número ingresado");
  }
};