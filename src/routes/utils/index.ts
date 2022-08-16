import express from "express";
import { downloadData } from "./tasks/downloadData";
import { getFieldsRoute } from "./tasks/getFields";
import { getNoUserLimitsRoute } from "./tasks/getNoUserLimits";

const app = express.Router();

app.get("/getFields", getFieldsRoute);
app.get("/downloadData/:file", downloadData);
app.get("/getNoUserLimits", getNoUserLimitsRoute);

export default app;
