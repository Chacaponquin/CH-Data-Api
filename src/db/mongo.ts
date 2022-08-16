import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
