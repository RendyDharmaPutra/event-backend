import { Router } from "express";
import { authController } from "./authentication.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import aclMiddleware from "../../middlewares/acl.middleware";
import { ROLES } from "../../constants/roles";
import { Request, Response } from "express";

const auth = Router();

auth.post(
  "/register",
  (req, res) => authController.register(req, res)
  /*
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/RegisterRequest"
      }
    }
    */
);
auth.post(
  "/login",
  (req, res) => authController.login(req, res)
  /*
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/LoginRequest"
      }
    }
    */
);
auth.get(
  "/me",
  authMiddleware,
  (req, res) => authController.me(req, res)
  /*
    #swagger.tags = ['Auth']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    */
);
auth.post(
  "/activation",
  (req, res) => authController.activation(req, res)
  /*
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/ActivationRequest"
      }
    }
    */
);

auth.put(
  "/update-profile",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  (req: Request, res: Response) => authController.updateProfile(req, res)
  /*
    #swagger.tags = ['Auth']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/UpdateProfileRequest"
      }
    }
    */
);
auth.put(
  "/update-password",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  (req: Request, res: Response) => authController.updatePassword(req, res)
  /*
    #swagger.tags = ['Auth']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/UpdatePasswordRequest"
      }
    }
    */
);

export default auth;
