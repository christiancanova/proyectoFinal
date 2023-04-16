class CartDto {
    constructor(cart) {
      this.id = cart._id;
      this.email = cart.email;
      this.products = cart.products;
      this.adress = cart.adress;
      this.date = cart.date;
    }
  }
  // comprobar si es un array de carritos o no y devolver el carrito mostrando los campos que se requieran
  export const cartDto = (carts) => {
    if (Array.isArray(carts)) {
      return carts.map((cart) => new CartDto(cart));
    } else {
      return new CartDto(carts);
    }
  };