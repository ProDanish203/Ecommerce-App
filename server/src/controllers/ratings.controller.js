import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Review } from "../models/ratings.model.js";

export const addReview = async (req, res, next) => {
  try {
    const { product, rating, review } = req.body;
    if (!product) return next("Product is required");
    if (!rating) return next("Rating is required");
    if (req.user.role === "admin") return next("Admins cannot review products");

    const existingReview = await Review.findOne({
      product,
      user: req.user._id,
    });
    if (existingReview) return next("You have already reviewed this product");

    const newReview = await Review.create({
      product,
      rating,
      review,
      user: req.user._id,
    });
    if (!review) return next("Failed to add review");

    return res.status(201).json({
      success: true,
      message: "Review added",
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
