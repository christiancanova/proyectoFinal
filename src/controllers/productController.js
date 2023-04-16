import ProductService from "../services/productService.js";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  allProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json({ productos: products });
    } catch (error) {
      res.status(500).json({ message: "Error al mostrar los productos" });
    }
  };
  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error obtener el producto por su ID" });
    }
  };
  getProductByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      const products = await this.productService.getProductByCategory(category);
      res.status(200).json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los productos por la categoria" });
    }
  };
  createProduct = async (req, res) => {
    try {
      const product = req.body;
      const createProduct = await this.productService.productSave(product);
      res
        .status(201)
        .json({ message: "Producto creado correctamente", createProduct });
    } catch (error) {
      res.status(500).json({ message: "Error al guardar el producto" });
    }
  };
  updateProduct = async (req, res) => {
    try {
      const product = req.body;
      const { id } = req.params;
      const productUpdate = await this.productService.updateProduct(
        id,
        product
      );
      res
        .status(200)
        .json({ message: "Producto actualizado correctamente", productUpdate });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
  };
  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.productService.deleteProduct(id);
      res
        .status(200)
        .json({ message: "Producto eliminado correctamente", product });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el producto" });
    }
  };
}