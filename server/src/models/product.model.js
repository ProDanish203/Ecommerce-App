import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"],
      },
    ],
    images: [
      {
        public_id: {
          type: String,
          required: [true, "Product Images are required"],
        },
        url: {
          type: String,
          required: [true, "Product Images are required"],
        },
      },
    ],
    slug: {
      type: String,
      required: [true, "Product Slug is required"],
      unique: [true, "Product slug must be unique"],
    },
    stock: {
      type: Number,
      default: 1,
      min: [0, "Stock cannot be negative"],
    },
    discountPercentage: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot be greater than 100"],
    },
    featured: { type: Boolean, default: false },
    brand: String,
  },
  { timestamps: true }
);

ProductSchema.plugin(mongoosePaginate);

export const Product = model("Product", ProductSchema);
