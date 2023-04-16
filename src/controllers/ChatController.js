import configServer from "../utils/configServer.js";
const BASE_URL = configServer();

export default class ChatController {
  constructor() {}

  getViewChat = (req, res) => {
    res.render("chat.ejs", {
      title: "Mensajes",
      BASE_URL,
    });
  };
}