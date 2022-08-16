import express from "express";
import { ImageAdminRoutes, VideoAdminRoutes } from "./tasks";

const app = express.Router();

app.use("/images", ImageAdminRoutes);
app.use("/video", VideoAdminRoutes);

export default app;
