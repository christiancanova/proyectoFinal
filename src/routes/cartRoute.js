import { Router } from "express";
import { check } from "express-validator";
import CartController from "../controllers/cartController.js";
import { existCart, validateEmail } from "../helpers/validateCart.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = new Router();

export default class CartRoute {
  constructor() {
    this.cartController = new CartController();
  }
  init = () => {
    //mostrar todos los carritos si el usuario esta logeado
    router.get("/", validateJwt, this.cartController.getCarts);
    //buscar carrito por Id
    router.get(
      "/:id",
      [
        validateJwt,
        check("id", "No existe un carrito con el Id solicitado").isMongoId(),
        validateFields,
      ],
      this.cartController.getCartById
    );
    // crear un carrito si el usuario esta logeado
    router.post(
      "/",
      [
        validateJwt,
        check("adress", "Ingrese la dirección para hacer la entrega")
          .not()
          .isEmpty(),
        check("email", "No se ingreso un email").not().isEmpty(),
        check("email").custom(validateEmail),
        check("email", "El email es incorrecto").isEmail(),
        validateFields,
      ],
      this.cartController.createCarts
    );
    //agregar un producto al carrito
    router.post(
      "/:idCart/productos/:idProduct",
      [
        validateJwt,
        check("idCart", "No existe un carrito con ese Id")
          .isMongoId()
          .custom(existCart),
        check(
          "idProduct",
          "No existe un producto con el Id especificado"
        ).isMongoId(),
        check("quantity", "No se ingreso la cantidad correcta")
          .not()
          .isEmpty()
          .isNumeric(),
        validateFields,
      ],
      this.cartController.addProductToCart
    );
    //actualizar cantidad de producto que está en el carrito
    router.put(
      "/:idCart/productos/:idProduct",
      [
        validateJwt,
        check("idCart", "No existe un carrito con ese Id")
          .isMongoId()
          .custom(existCart),
        check(
          "idProduct",
          "No existe un producto con el Id especificado"
        ).isMongoId(),
        check("quantity", "No se ingreso la cantidad correcta")
          .not()
          .isEmpty()
          .isNumeric(),
        validateFields,
      ],
      this.cartController.updateQuantity
    );
    //Eliminar carrito según su ID
    router.delete(
      "/:id",
      [
        validateJwt,
        check("id", "No existe un carrito con el Id solicitado").isMongoId(),
        validateFields,
      ],
      this.cartController.deleteCart
    );
    //borrar producto del carrito por el ID
    router.delete(
      "/:idCart/productos/:idProduct",
      [
        validateJwt,
        check("idCart", "No existe un carrito con ese Id")
          .isMongoId()
          .custom(existCart),
        check(
          "idProduct",
          "No existe un producto con el Id especificado"
        ).isMongoId(),
        validateFields,
      ],
      this.cartController.deleteProductById
    );
    //borrar todos los productos del carrito
    router.delete(
      "/:id/productos",
      [
        validateJwt,
        check("id", "No existe un carrito con el Id solicitado").isMongoId(),
        validateFields,
      ],
      this.cartController.deleteProducts
    );
    return router;
  };
}