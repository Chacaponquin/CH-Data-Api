import express from "express";
import { downloadData } from "./tasks/downloadData";
import { getConfigFileOptionsRoute } from "./tasks/getConfigFileOptions";
import { getFAQ } from "./tasks/getFAQ";
import { getApiOptions } from "./tasks/getApiOptions";
import { getNoUserLimitsRoute } from "./tasks/getNoUserLimits";

const app = express.Router();

app.get("/getApiOptions", getApiOptions);
app.get("/downloadData/:file", downloadData);
app.get("/getNoUserLimits", getNoUserLimitsRoute);
app.get("/getFileConfig", getConfigFileOptionsRoute);
app.get("/getFAQ", getFAQ);

export default app;
