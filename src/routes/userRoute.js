import { Router } from "express";
import { check } from "express-validator";
import UserController from "../controllers/userController.js";
import { validateEmail, validatePassword } from "../helpers/validateUser.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

export default class UserRoute {
  constructor() {
    this.userController = new UserController();
  }

  init = () => {
    router.post(
      //registrar un nuevo usuario
      "/register",
      [
        //validar que se ingresen correctamente los campos correspondientes
        check("firstname", "No se ingreso el nombre").not().isEmpty(),
        check("lastname", "No se ingreso el apellido").not().isEmpty(),
        check("email", "No se ingreso ningún email").not().isEmpty(),
        check("email", "El email es inválido").isEmail(),
        check("email").toLowerCase().custom(validateEmail),
        check("password", "No se ingreso una contraseña").not().isEmpty(),
        check(
          "password",
          "La contraseña debe tener mínimo 6 caracteres"
        ).isLength({ min: 6 }),
        check("verifyPassword").custom(validatePassword),
        check(
          "phone",
          "El telefóno no es correcto. Ingrese solo números (minimo 8 digitos)"
        ).isNumeric(),
        check(
          "phone",
          "Telèfono incorrecto. Ingrese mínimo 8 dígitos"
        ).isLength({ min: 8 }),
        validateFields,
      ], // guardar un nuevo usuario
      this.userController.createUser
    );
    router.post(
      //login del usuario
      "/login",
      [
        // validar que se ingresen los campos correctamente
        check("email", "Ingrese un email").toLowerCase().not().isEmpty(),
        check("email", "Ingrese un email válido").toLowerCase().isEmail(),
        check("password", "ingrese la contraseña").not().isEmpty(),
        validateFields,
      ],
      this.userController.userLogin
    );
    //vista de login
    router.get("/login", this.userController.getViewLogin);
    return router;
  };
}