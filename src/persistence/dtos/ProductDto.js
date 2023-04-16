class ProductDto {
    constructor(product) {
      this.id = product._id;
      this.name = product.name;
      this.description = product.description;
      this.thumbnail = product.thumbnail;
      this.price = product.price;
      this.category = product.category;
    }
  }
  // comprobar si es un array de productos o no y devolver el producto mostrando los campos que se requieran
  export const productDto = (products) => {
    if (Array.isArray(products)) {
      return products.map((product) => new ProductDto(product));
    } else {
      return new ProductDto(products);
    }
  };