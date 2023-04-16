import { cartDto } from "../dtos/cartDto.js";
import Cart from "../models/Cart.js";

export default class CartDao {
  constructor() {
    this.model = Cart;
  }
  //mostrar todos los carritos
  getCarts = async () => {
    try {
      const carts = await this.model.find();
      return cartDto(carts);
    } catch (error) {
      throw new Error("Error al mostrar todos los carritos", error);
    }
  };
  //mostrar carrito según su ID
  getCartById = async (id) => {
    try {
      const cart = await this.model.findById(id);
      return cartDto(cart);
    } catch (error) {
      throw new Error("Error al mostrar el carrito", error);
    }
  };
  //crear carrito
  createCart = async (cart) => {
    try {
      const newCart = new this.model(cart);
      await newCart.save();
      return cartDto(newCart);
    } catch (error) {
      throw new Error("No se pudo crear el carrito", error);
    }
  };
  //Eliminar carrito por su ID
  deleteCart = async (id) => {
    try {
      const deleteCart = await this.model.findByIdAndDelete(id);
      return cartDto(deleteCart);
    } catch (error) {
      throw new Error("No se pudo eliminar el carrito", error);
    }
  };
  //agregar productos al carrito con la cantidad indicada
  addProductToCart = async (idCart, cart) => {
    try {
      const cartUpdate = await this.model.findByIdAndUpdate(idCart, cart, {
        new: true,
      });
      return cartDto(cartUpdate);
    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito", error);
    }
  };
  // actualizar cantidad del producto agregado
  updateQuantity = async (idCart, quantity) => {
    try {
      const quantityUpdate = await this.model.findByIdAndUpdate(
        idCart,
        quantity,
        { new: true }
      );
      return cartDto(quantityUpdate);
    } catch (error) {
      throw new Error("No se pudo actualizar la cantidad del producto", error);
    }
  };
  // eliminar producto del carrito por su ID
  deleteProductById = async (idCart, product) => {
    try {
      return await this.model.findByIdAndUpdate(idCart, product, { new: true });
    } catch (error) {
      throw new Error("No se pudo actualizar la cantidad del producto", error);
    }
  };
  //borrar todos los productos del carrito
  deleteProducts = async (id, products) => {
    try {
      const deleteAllProducts = await this.model.findByIdAndUpdate(
        id,
        products,
        { new: true }
      );
      return deleteAllProducts;
    } catch (error) {
      throw new Error("No se pudieron eliminar los productos", error);
    }
  };
}