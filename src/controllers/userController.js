import UserService from "../services/userService.js";
import configServer from "../utils/configServer.js";
const BASE_URL = configServer();

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }
  createUser = async (req, res) => {
    try {
      const dataUser = req.body;
      const user = await this.userService.userSave(dataUser);
      res.status(200).json({ message: "usuario creado con exito", user });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario", error });
    }
  };
  userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      // buscar el usuario logeado y mostrar respuesta con el usuario y el token generado
      const userAuthenticated = await this.userService.userLogin(
        email,
        password
      );
      const { token } = userAuthenticated;
      res.cookie("token", token, { maxAge: 60 * 60 * 60 * 600, path: "/" }); //duracion de las cookies - 10 horas
      res.cookie("email", email, { maxAge: 60 * 60 * 60 * 600, path: "/" });
      res.status(201).json(userAuthenticated);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error al iniciar sesión - Datos incorrectos" });
    }
  };
  //vista renderizada de login
  getViewLogin = (req, res) => {
    try {
      res.render("login.ejs", { title: "Login", BASE_URL });
    } catch (error) {
      console.log("error 404");
    }
  };
}