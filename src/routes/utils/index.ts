import express from "express";
import { downloadData } from "./tasks/downloadData";
import { getApiOptionsRoute } from "./tasks/getApiOptions";
import { getConfigFileOptionsRoute } from "./tasks/getConfigFileOptions";
import { getFieldsRoute } from "./tasks/getFields";
import { getNoUserLimitsRoute } from "./tasks/getNoUserLimits";

const app = express.Router();

app.get("/getFields", getFieldsRoute);
app.get("/downloadData/:file", downloadData);
app.get("/getNoUserLimits", getNoUserLimitsRoute);
app.get("/getApiOptions", getApiOptionsRoute);
app.get("/getFileConfigFileOptions", getConfigFileOptionsRoute);

export default app;
