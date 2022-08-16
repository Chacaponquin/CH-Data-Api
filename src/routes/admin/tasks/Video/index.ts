import express from "express";
import { updateVideoTopicsRoute } from "./updateVideoTopics";

const app = express();

app.post("/updateVideoTopics", updateVideoTopicsRoute);

export default app;
