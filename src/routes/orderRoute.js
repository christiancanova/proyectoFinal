import { Router } from "express";
import { check } from "express-validator";
import OrderController from "../controllers/orderController.js";
import { existCart } from "../helpers/validateCart.js";
import { validateNumOrder } from "../helpers/validateOrder.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

export default class OrderRoute {
  constructor() {
    this.orderController = new OrderController();
  }
  init = () => {
    router.get("/", validateJwt, this.orderController.getOrders); // obtener todas las ordenes de compra
    //obtener orden por numero de orden
    router.get(
      "/:numOrder",
      [validateJwt, check("numOrder").custom(validateNumOrder), validateFields],
      this.orderController.getOrderByNum
    );
    // crear orden de compra
    router.post(
      "/:idCart",
      [
        validateJwt,
        check(
          "idCart",
          "No existe un carrito de compras con ese Id"
        ).isMongoId(),
        check("idCart").custom(existCart),
        validateFields,
      ],
      this.orderController.createOrder
    );
    router.delete(
      "/:numOrder",
      [validateJwt, check("numOrder").custom(validateNumOrder), validateFields],
      this.orderController.deleteOrderByNum
    ); // eliminar orden de compra por numero de orden
    return router;
  };
}