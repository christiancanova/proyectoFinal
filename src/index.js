import http from "http";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectedDB from "./persistence/configDB.js";
import routes from "./routes/index.js";
import sockets from "./utils/sockets.js";
import configServer from "./utils/configServer.js";

dotenv.config(); // utilización de variables de entorno
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT;
const BASE_URL = configServer(); //configuracion del servidor - producción / desarrollo

connectedDB(); // conectar a la base de datos
sockets(io);

// conexión vistas EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//carpeta pública del servidor
app.use("/public", express.static("public"));

app.use(routes); // conexión con las rutas de la API

const server = httpServer.listen(PORT);
server.on("listening", () => {
  console.log(`Server on ${BASE_URL}...`);
});