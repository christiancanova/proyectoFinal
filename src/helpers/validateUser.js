import User from "../persistence/models/User.js";

export const validatePassword = (verifyPassword, { req }) => {
  //comprobar la coincidencia de los passwords al registarse el usuario
  const { password } = req.body;
  if (verifyPassword !== password) {
    throw new Error("Las contraseñas no coinciden");
  }
  return true;
};
export const validateEmail = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(
      "Ya existe un usuario con el email ingresado. Por favor,ingrese otro email"
    );
  }
};