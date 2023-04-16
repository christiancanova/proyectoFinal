class OrderDto {
    constructor(order) {
      this.date = order.date;
      this.numOrder = order.numOrder;
      this.email = order.email;
      this.products = order.products;
      this.state = order.state;
      this.totalPrice = order.totalPrice;
    }
  }
  
  export const orderDto = (orders) => {
    if (Array.isArray(orders)) {
      return orders.map((order) => new OrderDto(order));
    } else {
      return new OrderDto(orders);
    }
  };