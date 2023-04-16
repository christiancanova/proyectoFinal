import jwt from "jsonwebtoken";
import User from "../persistence/models/User.js";

export const validateJwt = async (req, res, next) => {
  //validar token ingresado
  const token = req.header("authorization-token");
  if (!token) {
    //si no se envia token en header mostrar el error de permisos
    return res
      .status(401)
      .json({ message: "No tiene permisos para realizar esta acción" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY); //traer del token el ID del usuario
    //buscar el usuario por su ID en la DB y si no existe mostrar error de autenticación
    const user = await User.findById(uid);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Token no válido - El usuario no existe" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "El token no es válido" });
  }
};