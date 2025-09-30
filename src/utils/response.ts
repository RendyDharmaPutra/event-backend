import { Response } from "express";
import mongoose from "mongoose";
import * as Yup from "yup";

export interface PaginationMeta {
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export const responseUtils = {
  sendSuccess<T>(res: Response, data: T, message = "Success") {
    return res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },

  sendError(res: Response, error: unknown, message = "Server Error") {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        meta: {
          status: 400,
          message: error.message,
        },
        errors: {
          [error.path || "validation"]: error.errors[0],
        },
      });
    }

    if (error instanceof mongoose.Error) {
      return res.status(500).json({
        meta: {
          status: 500,
          message: error.message,
        },
        error: error.name,
      });
    }

    if ((error as any)?.code) {
      const mongoErr = error as any;
      return res.status(500).json({
        meta: {
          status: 500,
          message: mongoErr?.errorResponse?.errmsg || "Database Error",
        },
        error: mongoErr,
      });
    }

    return res.status(500).json({
      meta: {
        status: 500,
        message,
      },
      error,
    });
  },

  sendNotFound(res: Response, message = "Not Found") {
    return res.status(404).json({
      meta: {
        status: 404,
        message,
      },
      data: null,
    });
  },

  sendUnauthorized(res: Response, message = "Unauthorized") {
    return res.status(403).json({
      meta: {
        status: 403,
        message,
      },
      data: null,
    });
  },

  sendPagination<T>(
    res: Response,
    data: T[],
    pagination: PaginationMeta,
    message = "Success"
  ) {
    return res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },
};
