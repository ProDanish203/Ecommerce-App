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

export const getAllReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const filter = req.query.filter || "";
    let sortDirection = -1;

    if (filter.toLowerCase() === "lowtohigh") {
      sortDirection = 1;
    }

    const reviews = await getPaginatedReviews({
      query: { product: productId },
      page,
      limit,
      sort: { rating: sortDirection },
    });
    if (!reviews) return next("Reviews not found");

    return res.status(200).json({
      success: true,
      message: "Reviews fetched",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, review } = req.body;

    if (!rating) return next("Rating is required");

    const existingReview = await Review.findById(reviewId);
    if (!existingReview) return next("Review not found");

    if (existingReview.user.toString() !== req.user._id.toString())
      return next("You can only update your own reviews");

    existingReview.rating = rating ?? existingReview.rating;
    existingReview.review = review ?? existingReview.review;

    const updatedReview = await existingReview.save();

    return res.status(200).json({
      success: true,
      message: "Review updated",
      data: updatedReview,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const existingReview = await Review.findById(reviewId);
    if (!existingReview) return next("Review not found");

    if (existingReview.user.toString() !== req.user._id.toString())
      return next("You can only delete your own reviews");

    await existingReview.remove();

    return res.status(200).json({
      success: true,
      message: "Review deleted",
      data: null,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
