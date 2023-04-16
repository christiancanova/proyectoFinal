import { Router } from "express";
import CartRoute from "./cartRoute.js";
import ChatRoute from "./chatRoute.js";
import HomeRoute from "./homeRoutes.js";
import MessageRoute from "./messageRoute.js";
import OrderRoute from "./orderRoute.js";
import ProductRoute from "./productRoute.js";
import UserRoute from "./userRoute.js";

const router = Router();

const userRoute = new UserRoute();
const productRoute = new ProductRoute();
const cartRoute = new CartRoute();
const orderRoute = new OrderRoute();
const messageRoute = new MessageRoute();
const homeRoute = new HomeRoute();
const chatRoute = new ChatRoute();

//Acceso a las rutas
router.use("/", homeRoute.init()); // ruta vista login
router.use("/auth", userRoute.init()); // ruta para el registro y autenticación de usuarios
router.use("/productos", productRoute.init()); // ruta de productos
router.use("/carrito", cartRoute.init()); // ruta carrito de compras
router.use("/ordenes", orderRoute.init()); // ruta ordenes de compra
router.use("/chat", messageRoute.init()); // ruta mensajes del chat
router.use("/mensajes", chatRoute.init()); // ruta para la vista de los mensajes utilizando websockets
export default router;