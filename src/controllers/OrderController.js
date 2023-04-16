import OrderService from "../services/orderService.js";

export default class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }
  getOrders = async (req, res) => {
    try {
      const orders = await this.orderService.getOrders();
      res.status(200).json({ message: "Ordenes de compra", orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las ordenes de compra", error });
    }
  };
  getOrderByNum = async (req, res) => {
    try {
      const { numOrder } = req.params;
      const order = await this.orderService.getOrderByNum(numOrder);
      res.status(200).json({ message: "Orden de compra", order });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener la orden de compra", error });
    }
  };
  createOrder = async (req, res) => {
    try {
      const { idCart } = req.params;
      const order = await this.orderService.createOrder(idCart);
      res.status(200).json({ message: "Orden creada correctamente", order });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear la orden de compra", error });
    }
  };
  deleteOrderByNum = async (req, res) => {
    try {
      const { numOrder } = req.params;
      const order = await this.orderService.deleteOrderByNum(numOrder);
      res
        .status(200)
        .json({ message: "Orden de compra eliminada correctamente", order });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar la orden de compra", error });
    }
  };
}