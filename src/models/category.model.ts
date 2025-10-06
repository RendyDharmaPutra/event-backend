import mongoose, { Schema, Document } from "mongoose";
import { CategoryInput } from "../features/category/category.dto";

/**
 * Interface Category yang akan digunakan oleh Mongoose.
 * Menggabungkan struktur DTO dengan Document dari Mongoose.
 */
export interface ICategory extends CategoryInput, Document {}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel;
