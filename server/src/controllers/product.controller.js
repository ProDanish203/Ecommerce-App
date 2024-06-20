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

export const getAllProducts = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    let sortDirection = 1;

    if (filter.toLowerCase() === "ztoa") {
      sortDirection = -1;
    }

    const products = await getPaginatedProducts({
      query: { title: { $regex: `^${search}`, $options: "i" } },
      page,
      limit,
      sort: { title: sortDirection },
    });

    return res.status(200).json({
      success: true,
      message: "All products",
      data: products,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
