import { Router } from "express";
import { check } from "express-validator";
import ProductController from "../controllers/productController.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateName, validateCategory } from "../helpers/validateProduct.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
const router = Router();

export default class ProductRoute {
  constructor() {
    this.productController = new ProductController();
  }
  init = () => {
    //mostrar todos los productos si el usuario está logeado
    router.get("/", validateJwt, this.productController.allProducts);
    //buscar producto por su ID
    router.get(
      "/:id",
      [
        validateJwt,
        check(
          "id",
          "No existe ningún producto con el Id solicitado"
        ).isMongoId(),
        validateFields,
      ],
      this.productController.getProductById
    );
    //buscar productos por la categoria
    router.get(
      "/categoria/:category",
      [
        validateJwt,
        check("category", "No existe la categoria ingresada")
          .toLowerCase()
          .custom(validateCategory),
        validateFields,
      ],
      this.productController.getProductByCategory
    );
    router.post(
      //crear un nuevo producto si el usuario está logeado
      "/",
      [
        validateJwt,
        check("name", "Ingrese un nombre para el producto").not().isEmpty(),
        check("name").toLowerCase().custom(validateName),
        check("description", "Ingrese una descripción para el producto")
          .not()
          .isEmpty(),
        check("price", "Ingrese el precio del producto").not().isEmpty(),
        check("price", "El precio debe ser un número").isNumeric(),
        check(
          "thumbnail",
          "Ingrese una URL con la imágen del producto"
        ).isURL(),
        check("category", "Ingrese la categoria del producto")
          .not()
          .isEmpty()
          .toLowerCase(),
        validateFields,
      ],
      this.productController.createProduct
    );
    router.put(
      //actualizar producto - usuario logeado
      "/:id",
      [
        validateJwt,
        check("id", "No existe un producto con ese ID").isMongoId(),
        check("name", "Ingrese un nombre para el producto").not().isEmpty(),
        check("description", "Ingrese una descripción para el producto")
          .not()
          .isEmpty(),
        check("price", "Ingrese el precio del producto").not().isEmpty(),
        check("price", "El precio debe ser un número").isNumeric(),
        check(
          "thumbnail",
          "Ingrese una URL con la imágen del producto"
        ).isURL(),
        check("category", "Ingrese la categoria del producto")
          .not()
          .isEmpty()
          .toLowerCase(),
        validateFields,
      ],
      this.productController.updateProduct
    );
    //borrar producto - usuario logeado
    router.delete(
      "/:id",
      [
        validateJwt,
        check("id", "No existe un producto con el Id ingresado").isMongoId(),
        validateFields,
      ],
      this.productController.deleteProduct
    );
    return router;
  };
}