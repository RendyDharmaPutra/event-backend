import { Router } from "express";
import aclMiddleware from "../../middlewares/acl.middleware";
import { ROLES } from "../../constants/roles";
import authMiddleware from "../../middlewares/auth.middleware";
import { categoryController } from "./category.controller";
import { AuthRequest } from "../../types/common";
import { Response } from "express";

const category = Router();

category.get(
  "/",
  (req, res) => categoryController.findAll(req, res)
  /*
    #swagger.tags = ['Category']
    */
);

category.get(
  "/:id",
  (req, res) => categoryController.findOne(req, res)
  /*
    #swagger.tags = ['Category']
    */
);

category.post(
  "/",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  (req: AuthRequest, res: Response) => categoryController.create(req, res)
  /*
    #swagger.tags = ['Category']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/CreateCategoryRequest"
      }
    }
    */
);

category.put(
  "/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  (req: AuthRequest, res: Response) => categoryController.update(req, res)
  /*
    #swagger.tags = ['Category']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/CreateCategoryRequest"
      }
    }
    */
);

category.delete(
  "/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  (req: AuthRequest, res: Response) => categoryController.remove(req, res)
  /*
    #swagger.tags = ['Category']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    */
);

export default category;
