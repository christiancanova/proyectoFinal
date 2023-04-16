import { productDto } from "../dtos/productDto.js";
import Product from "../models/Product.js";

export default class ProductDao {
  constructor() {
    this.model = Product;
  }
  getProducts = async () => {
    // obtener todos los productos
    try {
      const products = await this.model.find();
      return productDto(products);
    } catch (error) {
      throw new Error(
        "Error al obtener los productos de la base de datos",
        error
      );
    }
  };
  //buscar producto por ID
  getProductById = async (id) => {
    try {
      const product = await this.model.findById(id);
      return productDto(product);
    } catch (error) {
      throw new Error("Error al buscar el producto por el ID", error);
    }
  };
  //buscar productos por categoria
  getProductByCategory = async (category) => {
    try {
      const products = await this.model.find({ category });
      return productDto(products);
    } catch (error) {
      throw new Error("Error al buscar los productos por categoria", error);
    }
  };
  //crear un nuevo producto
  createProduct = async (product) => {
    try {
      const newProduct = new this.model(product);
      await newProduct.save();
      return productDto(newProduct);
    } catch (error) {
      throw new Error("Error al guardar el usuario", error);
    }
  };
  //actualizar un producto
  updateProduct = async (id, product) => {
    try {
      const productUpdate = await this.model.findByIdAndUpdate(id, product, {
        new: true,
      });
      return productDto(productUpdate);
    } catch (error) {
      throw new Error("Error al actualizar el producto", error);
    }
  };
  //eliminar un producto
  deleteProduct = async (id) => {
    try {
      const product = await this.model.findByIdAndDelete(id);
      return productDto(product);
    } catch (error) {
      throw new Error("Error al eliminar el producto", error);
    }
  };
}