import { Router } from "express";
import { check } from "express-validator";
import MessageController from "../controllers/messageController.js";
import { validateEmail, validateTypeUser } from "../helpers/validateMessage.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { validateFields } from "../middlewares/validateFields.js";
 
const router = Router();

export default class MessageRoute {
  constructor() {
    this.messageController = new MessageController();
  }
  init = () => {
    //Mostrar todos los mensajes si el usuario esta logeado
    router.get("/", validateJwt, this.messageController.getMessages);
    // Mostrar mensajes filtrados por email si el usuario esta logeado
    router.get(
      "/:email",
      [
        validateJwt,
        check("email", "El email no es correcto")
          .isEmail()
          .custom(validateEmail),
        validateFields,
      ],
      this.messageController.getMessagesByEmail
    );
    // Guardar mensaje si el usuario esta logeado
    router.post(
      "/",
      [
        validateJwt,
        check("user", "No se ingreso el tipo de usuario")
          .not()
          .isEmpty()
          .custom(validateTypeUser),
        check("email", "No se ingreso un email")
          .not()
          .isEmpty()
          .custom(validateEmail),
        check("body", "No se ingreso ningún mensaje").not().isEmpty(),
        validateFields,
      ],
      this.messageController.saveMessage
    );
    // eliminar todos los mensajes
    router.delete("/", validateJwt, this.messageController.deleteAllMessages);
    return router;
  };
}