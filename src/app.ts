import express from "express";
import { env } from "./config/env";
import cors from "cors";
import bodyParser from "body-parser";
import docs from "./docs/route";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    data: null,
  });
});

docs(app);

app.listen(env.BACKEND_PORT, () => {
  console.log(`Server is running on port ${env.BACKEND_PORT}`);
});
