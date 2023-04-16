import CartService from "../services/cartService.js";

export default class CartController {
  constructor() {
    this.cartService = new CartService();
  }
  getCarts = async (req, res) => {
    try {
      const carts = await this.cartService.getCarts();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: "Error al mostrar los carritos", error });
    }
  };
  getCartById = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteCart = await this.cartService.getCartById(id);
      res.status(200).json(deleteCart);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar el carrito", error });
    }
  };
  createCarts = async (req, res) => {
    try {
      const cart = req.body;
      const newCart = await this.cartService.createCart(cart);
      res.status(201).json({ message: "Carrito creado con exito", newCart });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el carrito", error });
    }
  };
  deleteCart = async (req, res) => {
    try {
      const { id } = req.params;
      const cartDelete = await this.cartService.deleteCart(id);
      res
        .status(200)
        .json({ message: "Carrito eliminado correctamente", cartDelete });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el carrito", error });
    }
  };
  addProductToCart = async (req, res) => {
    try {
      const { idCart, idProduct } = req.params;
      const { quantity } = req.body;
      const addProduct = await this.cartService.addroductToCart(
        idCart,
        idProduct,
        quantity
      );
      res.status(200).json({
        message: "Producto agregado correctamente al carrito",
        addProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al agregar el producto", error });
    }
  };
  updateQuantity = async (req, res) => {
    try {
      const { idCart, idProduct } = req.params;
      const { quantity } = req.body;
      const addProduct = await this.cartService.updateQuantity(
        idCart,
        idProduct,
        quantity
      );
      res.status(200).json({
        message: "Cantidad actualizada correctamente",
        addProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar la cantidad", error });
    }
  };
  deleteProductById = async (req, res) => {
    try {
      const { idCart, idProduct } = req.params;
      const productDelete = await this.cartService.deleteProductById(
        idCart,
        idProduct
      );
      res.status(200).json({
        message: "Producto eliminado correctamente del carrito",
        productDelete,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el producto", error });
    }
  };
  deleteProducts = async (req, res) => {
    try {
      const { id } = req.params;
      await this.cartService.deleteProducts(id);
      res.status(200).json({
        message:
          "Todos los productos fueron eliminados correctamente del carrito",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar los productos", error });
    }
  };
}