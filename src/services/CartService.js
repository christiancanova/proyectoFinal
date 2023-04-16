import CartDao from "../persistence/daos/cart.js";
import ProductService from "./productService.js";

export default class CartService {
  constructor() {
    this.cartDao = new CartDao();
    this.productService = new ProductService();
  }
  getCarts = async () => {
    try {
      const carts = await this.cartDao.getCarts();
      //si no hay carritos disponibles mostrar mensaje
      if (carts.length === 0) {
        return "No existe ningún carrito";
      }
      return carts;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener todos los carritos");
    }
  };
  getCartById = async (id) => {
    try {
      return await this.cartDao.getCartById(id);
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el producto por su ID");
    }
  };
  createCart = async (cart) => {
    try {
      const { products } = cart;
      const newCart = {
        date: new Date().toString(),
        email: cart.email.toLowerCase(),
        products,
        adress: cart.adress.toLowerCase(),
      };
      return await this.cartDao.createCart(newCart);
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el carrito");
    }
  };
  deleteCart = async (id) => {
    try {
      return await this.cartDao.deleteCart(id);
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar el carrito");
    }
  };
  addroductToCart = async (idCart, idProduct, quantity) => {
    try {
      const cart = await this.cartDao.getCartById(idCart);
      const product = await this.productService.getProductById(idProduct);
      const productFind = cart.products.find(
        (product) => product.id == idProduct
      );
      //producto que se agrega al carrito
      const addProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: quantity,
      };
      //si el producto no existe en el carrito se agrega
      if (!productFind) {
        cart.products.push(addProduct);
      } else {
        // si el producto existe se suma la cantidad nueva
        cart.products.map(
          (product) =>
            product == productFind && {
              quantity: (product.quantity += quantity),
            }
        );
      }
      return await this.cartDao.addProductToCart(idCart, cart);
    } catch (error) {
      console.log(error);
      throw new Error("Error al agregar el producto al carrito");
    }
  };
  //actualizar la cantidad del producto que está en el carrito
  updateQuantity = async (idCart, idProduct, quantity) => {
    try {
      const cart = await this.cartDao.getCartById(idCart);
      const product = cart.products.find((product) => product.id == idProduct);
      const updateCant = { ...product, quantity };
      const indexProduct = cart.products.indexOf(product);
      cart.products.splice(indexProduct, 1, updateCant);
      return await this.cartDao.updateQuantity(idCart, cart);
    } catch (error) {
      console.log(error);
      throw new Error("Error al acualizar la cantidad");
    }
  };
  // eliminar producto del carrito por su ID
  deleteProductById = async (idCart, idProduct) => {
    try {
      const cart = await this.cartDao.getCartById(idCart);
      const productFind = cart.products.find(
        (product) => product.id == idProduct
      );
      const indexProduct = cart.products.indexOf(productFind);
      cart.products.splice(indexProduct, 1);
      return await this.cartDao.deleteProductById(idCart, cart);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo eliminar el producto del carrito");
    }
  };
  // borrar todos los productos del carrito
  deleteProducts = async (idCart) => {
    try {
      const cart = await this.cartDao.getCartById(idCart);
      const { id, email, products, adress, date } = cart;
      const productsDelete = {
        id,
        email,
        products: [],
        adress,
        date,
      };
      return await this.cartDao.deleteProducts(idCart, productsDelete);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudieron eliminar los productos del carrito");
    }
  };
}