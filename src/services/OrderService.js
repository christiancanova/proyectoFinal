import OrderDaos from "../persistence/daos/order.js";
import { sendMailOrderAdmin } from "../utils/sendMailOrderAdmin.js";
import { sendMailOrderUser } from "../utils/sendMailOrderUser.js";
import CartService from "./cartService.js";

export default class OrderService {
  constructor() {
    this.orderDaos = new OrderDaos();
    this.cartService = new CartService();
  }
  // obtener todas las ordenes de compra
  getOrders = async () => {
    try {
      const orders = await this.orderDaos.getOrders();
      if (orders.length === 0) {
        return "No existe ninguna orden";
      }
      return orders;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener las ordenes");
    }
  };
  // obtener orden por numero de orden
  getOrderByNum = async (numOrder) => {
    try {
      return await this.orderDaos.getOrderByNum(numOrder);
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener la orden");
    }
  };
  // crear orden de compra y una vez efecutada, eliminar el carrito de compras
  createOrder = async (idCart) => {
    try {
      const orders = await this.orderDaos.getOrders();
      const cart = await this.cartService.getCartById(idCart);
      // const { numOrder, date, email, products, state, totalPrice,adress } = cart;
      //obtener el costo total de la compra
      const priceTotal = cart.products.map(
        (product) => product.price * product.quantity
      );
      const total = priceTotal.reduce((a, b) => a + b);
      // filtrar contenido de los productos en la orden de compra
      const productsCart = cart.products.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      }));
      // numeros de orden de compra
      let orderNum;
      if (orders.length === 0) {
        orderNum = 1;
      } else {
        const lastOrder = orders.at(-1);
        orderNum = lastOrder.numOrder + 1;
      }
      // datos que se van a guardar en la orden
      const order = {
        date: new Date().toString(),
        numOrder: orderNum,
        email: cart.email,
        products: productsCart,
        totalPrice: total,
      };
      // crear la orden
      const orderCreate = await this.orderDaos.createOrder(order);
      // Enviar email al administrador con el pedido y al usuario con el detalle de la compra
        const sendOrder ={
          ...order,adress:cart.adress
        };
        await sendMailOrderAdmin(sendOrder);
        await sendMailOrderUser(sendOrder);
      // eliminar el carrito de compras
      await this.cartService.deleteCart(idCart);
      return orderCreate;
    } catch (error) {
      console.log(error);
      throw new Error("Error al generar la orden");
    }
  };
  // Eliminar orden por número de orden
  deleteOrderByNum = async (numOrder) => {
    try {
      return await this.orderDaos.deleteOrderByNum(numOrder);
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar la orden");
    }
  };
}