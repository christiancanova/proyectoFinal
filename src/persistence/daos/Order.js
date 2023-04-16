import Order from "../models/Order.js";
import { orderDto } from "../dtos/orderDto.js";

export default class OrderDaos {
  constructor() {
    this.model = Order;
  }
  //obtener todas las ordenes de compra
  getOrders = async () => {
    try {
      const order = await this.model.find();
      return orderDto(order);
    } catch (error) {
      throw new Error("No se pudo obtener las ordenes de compra", error);
    }
  };
  // obtener orden por número de orden
  getOrderByNum = async (numOrder) => {
    try {
      const order = await this.model.findOne({ numOrder });
      return orderDto(order);
    } catch (error) {
      throw new Error("No se pudo obtener la orden por su numero", error);
    }
  };
  // crear la orden de compra
  createOrder = async (detail) => {
    try {
      const order = new this.model(detail);
      order.save();
      return orderDto(order);
    } catch (error) {
      throw new Error("No se pudo crear la orden de compra", error);
    }
  };
  // Eliminar orden por numero de orden
  deleteOrderByNum = async (numOrder) => {
    try {
      const order = await this.model.findOneAndDelete({ numOrder });
      return orderDto(order);
    } catch (error) {
      throw new Error("No se pudo eliminar la orden", error);
    }
  };
}