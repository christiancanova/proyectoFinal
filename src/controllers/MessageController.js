import MessageService from "../services/messageService.js";

export default class MessageController {
  constructor() {
    this.messageService = new MessageService();
  }
  // obtener todos los mensajes
  getMessages = async (req, res) => {
    try {
      const messages = await this.messageService.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los mensajes", error });
    }
  };
  //obtener mensajes por email
  getMessagesByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const messages = await this.messageService.getMessagesByEmail(email);
      res.status(200).json(messages);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los mensajes por email", error });
    }
  };
  // guardar mensaje
  saveMessage = async (req, res) => {
    try {
      const message = req.body;
      const addMessage = await this.messageService.saveMessage(message);
      res.status(200).json(addMessage);
    } catch (error) {
      res.status(500).json({ message: "Error al guardar el mensaje", error });
    }
  };
  // eliminar todos los mensajes
  deleteAllMessages = async (req, res) => {
    try {
      await this.messageService.deleteAllMessages();
      res
        .status(200)
        .json({
          message: "todos los mensajes fueron eliminados correctamente",
        });
    } catch (error) {
      res.status(500).json({ mesage: "Error al eliminar los mensajes", error });
    }
  };
}