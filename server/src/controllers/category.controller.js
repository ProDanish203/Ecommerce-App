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

export const getCategories = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    let sortDirection = 1;

    if (filter.toLowerCase() === "ztoa") {
      sortDirection = -1;
    }

    const categories = await getPaginatedCategories({
      query: { name: { $regex: `^${search}`, $options: "i" } },
      page,
      limit,
      sort: { name: sortDirection },
    });

    return res.status(200).json({
      success: true,
      message: "All categories",
      data: products,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name, description, slug } = req.body;
    const { id } = req.params;
    const { parentCategory } = req.query;

    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) return next("Parent category not found");
    }
    if (!name) return next("Name is required");
    if (!slug) return next("Slug is required");

    const category = await Category.findByIdAndUpdate(id, {
      name,
      description,
      slug,
      parentCategory: parentCategory || null,
      createdBy: req.user._id,
    });

    if (!category) return next("An error occured while updating category");

    return res.status(201).json({
      success: true,
      message: "Category updated",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return next("An error occured while deleting category");

    return res.status(201).json({
      success: true,
      message: "Category Deleted",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
