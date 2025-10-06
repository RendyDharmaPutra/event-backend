import { isValidObjectId } from "mongoose";
import CategoryModel from "../../models/category.model";
import { PaginationQuery } from "../../types/common";

export class CategoryService {
  async create(data: any) {
    await CategoryModel.create(data);
    return data;
  }

  async findAll({ page = 1, limit = 10, search }: PaginationQuery) {
    const query: any = {};

    if (search) {
      Object.assign(query, {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
    }

    const result = await CategoryModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await CategoryModel.countDocuments(query);

    return {
      result,
      pagination: {
        total: count,
        totalPages: Math.ceil(count / limit),
        current: page,
      },
    };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) return null;
    return CategoryModel.findById(id);
  }

  async update(id: string, data: any) {
    if (!isValidObjectId(id)) return null;
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) return null;
    return CategoryModel.findByIdAndDelete(id, { new: true });
  }
}

export const categoryService = new CategoryService();
