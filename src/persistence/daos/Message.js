import Messages from "../models/Messages.js";
import { messageDto } from "../dtos/messageDto.js";

export default class MessageDao {
  constructor() {
    this.model = Messages;
  }
  //obtener todos lo mensajes del chat
  getMessages = async () => {
    try {
      const messages = await this.model.find();
      return messageDto(messages);
    } catch (error) {
      throw new Error("No se pudieron obtener todos los mensajes", error);
    }
  };
  // obtener mensajes del chat por email
  getMessagesByEmail = async (email) => {
    try {
      const message = await this.model.find({ email });
      return messageDto(message);
    } catch (error) {
      throw new Error("No se pudieron obtener los mensajes por email", error);
    }
  };
  // guardar mensajes del chat
  saveMessage = async (message) => {
    try {
      const newMessage = new this.model(message);
      newMessage.save();
      return messageDto(newMessage);
    } catch (error) {
      throw new Error("No se pudo guardar el mensaje", error);
    }
  };
  // borrar todos los mensajes
  deleteAllMessages = async () => {
    try {
      return await this.model.deleteMany();
    } catch (error) {
      throw new Error("No se pudieron eliminar los mensajes", error);
    }
  };
}