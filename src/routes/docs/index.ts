import { Router } from "express";
import { getCustomFormGuides } from "./tasks/getCustomFormGuides";

const app = Router();

app.get("/getCustomFormGuides", getCustomFormGuides);

export default app;
