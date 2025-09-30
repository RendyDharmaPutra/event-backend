import { Express } from "express";

export const registerRoutes = (app: Express) => {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Server is running",
      data: null,
    });
  });
};
