import express from "express";
import { downloadData } from "./tasks/downloadData";
import { getConfigFileOptionsRoute } from "./tasks/getConfigFileOptions";
import { getFAQ } from "./tasks/getFAQ";
import { getApiOptions } from "./tasks/getApiOption";
import { getNoUserLimitsRoute } from "./tasks/getNoUserLimits";

const app = express.Router();

app.get("/getApiOptions", getApiOptions);
app.get("/downloadData/:file", downloadData);
app.get("/getNoUserLimits", getNoUserLimitsRoute);
app.get("/getFileConfigFileOptions", getConfigFileOptionsRoute);
app.get("/getFAQ", getFAQ);

export default app;
