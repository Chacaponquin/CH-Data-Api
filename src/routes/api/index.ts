import express from "express";
import { getRandomDataRoute } from "./tasks/getRandomData";

const app = express.Router();

app.get("/:parent/:field", getRandomDataRoute);

export default app;
