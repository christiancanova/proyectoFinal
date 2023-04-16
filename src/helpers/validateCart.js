import Cart from "../persistence/models/Cart.js";
import User from "../persistence/models/User.js";

export const existCart = async (id) => {
  const cart = await Cart.findById(id);
  if (!cart) {
    throw new Error("No existe un carrito con ese Id");
  }
};
export const validateEmail = async (email) => {
  const emailExist = await User.findOne({ email });
  const cartEmailExist = await Cart.findOne({ email });
  if (!emailExist) {
    throw new Error(
      "No existe un usuario registrado con ese email. Por favor,ingrese otro email"
    );
  }
  if (cartEmailExist) {
    throw new Error("Ya existe un carrito con el email ingresado");
  }
};