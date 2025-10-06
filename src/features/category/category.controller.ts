import { Request, Response } from "express";
import { CategoryService, categoryService } from "./category.service";
import { CategoryDTO } from "./category.dto";
import { AuthRequest } from "../../types/common";
import { responseUtils } from "../../utils/response";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async create(req: AuthRequest, res: Response) {
    try {
      await CategoryDTO.validate(req.body);
      const result = await this.categoryService.create(req.body);
      responseUtils.sendSuccess(res, result, "success create category");
    } catch (error) {
      responseUtils.sendError(res, error, "failed create category");
    }
  }

  async findAll(req: AuthRequest, res: Response) {
    try {
      const { page = 1, limit = 10, search } = req.query as any;
      const result = await this.categoryService.findAll({
        page: Number(page),
        limit: Number(limit),
        search,
      });

      responseUtils.sendPagination(
        res,
        result.result,
        {
          totalPages: result.pagination.totalPages,
          currentPage: result.pagination.current,
          totalItems: result.pagination.total,
        },
        "success get all categories"
      );
    } catch (error) {
      responseUtils.sendError(res, error, "failed get categories");
    }
  }

  async findOne(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.categoryService.findOne(id);

      if (!result) return responseUtils.sendNotFound(res, "category not found");

      responseUtils.sendSuccess(res, result, "success get category");
    } catch (error) {
      responseUtils.sendError(res, error, "failed get category");
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.categoryService.update(id, req.body);

      if (!result) return responseUtils.sendNotFound(res, "category not found");

      responseUtils.sendSuccess(res, result, "success update category");
    } catch (error) {
      responseUtils.sendError(res, error, "failed update category");
    }
  }

  async remove(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.categoryService.remove(id);

      if (!result) return responseUtils.sendNotFound(res, "category not found");

      responseUtils.sendSuccess(res, result, "success delete category");
    } catch (error) {
      responseUtils.sendError(res, error, "failed delete category");
    }
  }
}

export const categoryController = new CategoryController(categoryService);
