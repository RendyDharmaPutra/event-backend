import mongoose from "mongoose";
import { env } from "../config/env";

export const mongoDbConnect = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL, {
      dbName: "eventdb",
    });
    console.log("Database status: connected!");
  } catch (error) {
    console.log("Database status: failed to connect!", error);
  }
};
