import ProductDao from "../persistence/daos/products.js";

export default class ProductService {
  constructor() {
    this.productDao = new ProductDao();
  }
  getAllProducts = async () => {
    try {
      const product = await this.productDao.getProducts();
      if (product.length === 0) {
        //si no hay productos disponibles mostra mensaje
        return "No existe ningún producto disponible";
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo obtener todos los productos");
    }
  };
  getProductById = async (id) => {
    try {
      return await this.productDao.getProductById(id);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo obtener los productos por su ID");
    }
  };
  getProductByCategory = async (category) => {
    try {
      return await this.productDao.getProductByCategory(category);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo obtener los productos por su categoria");
    }
  };
  productSave = async (product) => {
    try {
      return await this.productDao.createProduct(product);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo guardar el producto");
    }
  };
  updateProduct = async (id, product) => {
    try {
      return await this.productDao.updateProduct(id, product);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo actualizar el producto");
    }
  };
  deleteProduct = async (id) => {
    try {
      return await this.productDao.deleteProduct(id);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo eliminar el producto");
    }
  };
}