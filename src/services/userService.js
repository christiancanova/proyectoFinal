import { generateJWT } from "../helpers/generate-Jwt.js";
import UserDao from "../persistence/daos/users.js";
import { userDto } from "../persistence/dtos/userDto.js";
import {
  encryptPassword,
  comparePassword,
} from "../utils/password-security.js";
import { sendMailRegister } from "../utils/sendMailRegister.js";

export default class UserService {
  constructor() {
    this.userDao = new UserDao();
  }
  userSave = async (user) => {
    //guardar usuario
    try {
      const { firstname, lastname, email, phone, password } = user;
      const passwordEncrypt = await encryptPassword(password);
      const userEncrypt = {
        firstname,
        lastname,
        email,
        phone,
        password: passwordEncrypt, //encryptar la contraseña en la base de datos
      };
      const newUser = await this.userDao.saveUser(userEncrypt);
      await sendMailRegister(userEncrypt); // datos para el envio del mail de nuevo usuario registrado
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo crear el usuario");
    }
  };
  //login del usuario
  userLogin = async (email, password) => {
    //comprobar si existe usuario regitrado con el email
    const user = await this.userDao.getUserByEmail(email);
    if (!user) {
      throw new Error("No existe el usuario");
    }
    //comprobar que el password sea correcto
    const verifyPassword = await comparePassword(password, user.password);
    if (!verifyPassword) {
      throw new Error("Contraseña incorrecta");
    }
    //Generar token al hacer login con el usuario autenticado
    const userAuthenticated = userDto(user);
    const token = await generateJWT(userAuthenticated.uid);
    return {
      userAuthenticated,
      token,
    };
  };
}