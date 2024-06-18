import { Product } from "../models/product.model.js";

export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next("Product Not Found");

    return res.status(200).json({
      success: true,
      message: "Product fetched",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
