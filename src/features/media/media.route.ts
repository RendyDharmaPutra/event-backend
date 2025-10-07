import { Response, Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import aclMiddleware from "../../middlewares/acl.middleware";
import { ROLES } from "../../constants/roles";
import { mediaMiddleware } from "../../middlewares/media.middleware";
import { mediaController } from "./media.controller";
import { AuthRequest } from "../../types/common";

const media = Router();

media.post(
  "/upload-single",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.single("file"),
  ],
  (req: AuthRequest, res: Response) => mediaController.single(req, res)
  /*
    #swagger.tags = ['Media']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              file: {
                type: "string",
                format: "binary"
              }
            }
          }
        }
      }
    }
    */
);
media.post(
  "/upload-multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.multiple("files"),
  ],
  (req: AuthRequest, res: Response) => mediaController.multiple(req, res)
  /*
    #swagger.tags = ['Media']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              files: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary"
                }
              }
            }
          }
        }
      }
    }
    */
);
media.delete(
  "/remove",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  (req: AuthRequest, res: Response) => mediaController.remove(req, res)
  /*
    #swagger.tags = ['Media']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/RemoveMediaRequest"
      }
    }
    */
);

export default media;
