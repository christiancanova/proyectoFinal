import User from "../persistence/models/User.js";

export const validateEmail = async (email) => {
  const emailExist = await User.findOne({ email });
  if (!emailExist) {
    throw new Error("No existe un usuario con el email ingresado");
  }
};
// validar el tipo de usuario
export const validateTypeUser = async (user) => {
  if (user.toLowerCase() !== "usuario" && user.toLowerCase() !== "sistema") {
    throw new Error('Tipo de usuario incorrecto. Elija "usuario" ó "sistema"');
  }
};