import { Category } from "../models/category.model.js";
import { getPaginatedCategories } from "../utils/helpers.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, description, slug } = req.body;
    const { parentCategory } = req.query;
    if (!name) return next("Name is required");
    if (!slug) return next("Slug is required");

    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) return next("Parent category not found");
    }

    const category = await Category.create({
      name,
      description,
      slug,
      parentCategory: parentCategory || null,
      createdBy: req.user._id,
    });

    if (!category) return next("An error occured while adding category");

    return res.status(201).json({
      success: true,
      message: "Category added",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};