import { Router } from "express";
import { authController } from "./authentication.controller";
// import { authMiddleware } from "../../middleware/auth";
// import { aclMiddleware } from "../../middleware/acl";
import { ROLES } from "../../constants/roles";

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
//   auth.get(
//     "/me",
//     authMiddleware,
//     authController.me
//     /*
//     #swagger.tags = ['Auth']
//     #swagger.security = [{
//       "bearerAuth": {}
//     }]
//     */
//   );
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

//   auth.put(
//     "/update-profile",
//     [authMiddleware, aclMiddleware([ROLES.MEMBER])],
//     authController.updateProfile
//     /*
//     #swagger.tags = ['Auth']
//     #swagger.security = [{
//       "bearerAuth": {}
//     }]
//     #swagger.requestBody = {
//       required: true,
//       schema: {
//         $ref: "#/components/schemas/UpdateProfileRequest"
//       }
//     }
//     */
//   );
//   auth.put(
//     "/update-password",
//     [authMiddleware, aclMiddleware([ROLES.MEMBER])],
//     authController.updatePassword
//     /*
//     #swagger.tags = ['Auth']
//     #swagger.security = [{
//       "bearerAuth": {}
//     }]
//     #swagger.requestBody = {
//       required: true,
//       schema: {
//         $ref: "#/components/schemas/UpdatePasswordRequest"
//       }
//     }
//     */
//   );

export default auth;
