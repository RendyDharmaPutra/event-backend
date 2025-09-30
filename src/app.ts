import express from "express";
import { env } from "./config/env";
import cors from "cors";
import bodyParser from "body-parser";
import docs from "./docs/route";
import { registerRoutes } from "./config/routes";
import { mongoDbConnect } from "./utils/mongo_db";

mongoDbConnect();

const app = express();

app.use(cors());
app.use(bodyParser.json());

registerRoutes(app);

docs(app);

app.listen(env.BACKEND_PORT, () => {
  console.log(`Server is running on port ${env.BACKEND_PORT}`);
});
