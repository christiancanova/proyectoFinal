import MessageDao from "../persistence/daos/message.js";

export default class MessageService {
  constructor() {
    this.messageDao = new MessageDao();
  }
  getMessages = async () => {
    try {
      const messages = await this.messageDao.getMessages();
      return messages;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener todo los mensajes");
    }
  };
  getMessagesByEmail = async (email) => {
    try {
      return await this.messageDao.getMessagesByEmail(email);
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los mensajes por email");
    }
  };
  saveMessage = async (message) => {
    try {
      //agregar datos al mensaje ( fecha y hora actual y el email con el usuario que esta logeado)
      const addMessage = {
        date: new Date().toString(),
        email: message.email.toLowerCase(),
        user: message.user.toLowerCase(),
        body: message.body,
      };
      return await this.messageDao.saveMessage(addMessage);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo guarda el mensaje");
    }
  };
  deleteAllMessages = async () => {
    try {
      return await this.messageDao.deleteAllMessages();
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo eliminar todos los mensajes");
    }
  };
}