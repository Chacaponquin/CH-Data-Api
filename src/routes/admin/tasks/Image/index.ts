import express from "express";
import { updateImageTopics } from "./updateImageTopics";

const app = express();

app.post("/updateImageTopics", updateImageTopics);

export default app;
