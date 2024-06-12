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
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    slug: {
      type: String,
      required: [true, "Product Slug is required"],
      unique: [true, "Product slug must be unique"],
    },
    stock: {
      type: Number,
      default: 1,
    },

  },
  { timestamps: true }
);

ProductSchema.plugin(mongoosePaginate);

export const Product = model("Product", ProductSchema);
