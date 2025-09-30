import { Express } from "express";
import auth from "../features/authentication/authentication.route";

export const registerRoutes = (app: Express) => {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Server is running",
      data: null,
    });
  });

  app.use("/auth", auth);
};
