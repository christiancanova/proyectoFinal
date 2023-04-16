import Product from "../persistence/models/Product.js";

export const validateName = async (name) => {
  //comprobar que no existan productos con el mismo nombre
  const product = await Product.findOne({ name });
  if (product) {
    throw new Error("Ya existe un producto con ese nombre");
  }
};
//comprobar que existan productos en la categoria solicitada
export const validateCategory = async (category) => {
  const products = await Product.find({ category });
  if (products.length===0) {
    throw new Error("No existen productos con la categoria solicitada");
  }
};