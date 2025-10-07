import { responseUtils } from "./../../utils/response";
import { Response } from "express";
import { mediaService } from "./media.service";
import { AuthRequest } from "../../types/common";

export class MediaController {
  async single(req: AuthRequest, res: Response) {
    if (!req.file) {
      return responseUtils.sendError(res, null, "file not found");
    }

    try {
      const result = await mediaService.uploadSingle(req.file);
      responseUtils.sendSuccess(res, result, "success upload a file");
    } catch (error) {
      responseUtils.sendError(res, error, "failed upload a file");
    }
  }

  async multiple(req: AuthRequest, res: Response) {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return responseUtils.sendError(res, null, "files not found");
    }

    try {
      const result = await mediaService.uploadMultiple(files);
      responseUtils.sendSuccess(res, result, "success upload files");
    } catch (error) {
      responseUtils.sendError(res, error, "failed upload files");
    }
  }

  async remove(req: AuthRequest, res: Response) {
    try {
      const { fileUrl } = req.body as { fileUrl: string };
      const result = await mediaService.remove(fileUrl);
      responseUtils.sendSuccess(res, result, "success remove file");
    } catch (error) {
      responseUtils.sendError(res, error, "failed remove file");
    }
  }
}

export const mediaController = new MediaController();
