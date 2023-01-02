import authenticationRoutes from "./authentication";
import utilRoutes from "./utils";
import userRoutes from "./user";
import apiRoutes from "./api";
import docsRoutes from "./docs";
import { Router } from "express";
import { createContextUser } from "../shared/tasks/createContextUser";

const app = Router();

app.get("/", (req, res) => res.send("Hello Welcome to CHACA Api!!!"));

app.use("/", createContextUser);

app.use("/auth", authenticationRoutes);
app.use("/util", utilRoutes);
app.use("/user", userRoutes);
app.use("/api", apiRoutes);
app.use("/docs", docsRoutes);

export default app;
