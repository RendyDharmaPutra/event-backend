import { Router } from "express";
import { authController } from "./authentication.controller";

const auth = Router();

auth.get("/login", (req, res) => authController.login(req, res));
auth.post("/login", (req, res) => authController.login(req, res));
auth.get("/register", (req, res) => authController.register(req, res));
auth.post("/register", (req, res) => authController.register(req, res));

export default auth;
