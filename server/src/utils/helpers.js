import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Review } from "../models/ratings.model.js";

export const getPaginatedData = async ({
  model,
  page = 1,
  limit = 10,
  query = {},
  populate = "",
  select = "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry",
  sort = { createdAt: -1 },
}) => {
  const options = {
    select,
    sort,
    page,
    limit,
    populate,
    lean: true,
    customLabels: {
      totalDocs: "totalItems",
      docs: "data",
      limit: "perPage",
      page: "currentPage",
      meta: "pagination",
    },
  };

  const { data, pagination } = await model.paginate(query, options);
  delete pagination?.pagingCounter;

  return { data, pagination };
};

export const getPaginatedUsers = async ({ query, page, limit, sort }) => {
  const { data, pagination } = await getPaginatedData({
    model: User,
    query: { ...query },
    page,
    limit,
    sort,
  });

  return { data, pagination };
};

export const getPaginatedProducts = async ({ query, page, limit, sort }) => {
  const { data, pagination } = await getPaginatedData({
    model: Product,
    query: { ...query },
    page,
    limit,
    sort,
  });

  return { data, pagination };
};

export const getPaginatedCategories = async ({ query, page, limit, sort }) => {
  const { data, pagination } = await getPaginatedData({
    model: Category,
    query: { ...query },
    page,
    limit,
    sort,
  });

  return { data, pagination };
};

export const getPaginatedReviews = async ({ query, page, limit, sort }) => {
  const { data, pagination } = await getPaginatedData({
    model: Review,
    query: { ...query },
    page,
    limit,
    sort,
  });

  return { data, pagination };
};
