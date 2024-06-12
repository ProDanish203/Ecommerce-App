import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      unique: [true, "Category slug must be unique"],
      required: [true, "Category slug is required"],
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

CategorySchema.plugin(mongoosePaginate);

export const Category = model("Category", CategorySchema);
