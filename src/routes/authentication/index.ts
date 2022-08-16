import express from "express";
import { createUserRoute } from "./tasks/createUser";
import { getUserByToken } from "./tasks/getUserByToken";
import { signInUser } from "./tasks/signInUser";

const app = express.Router();

app.post("/createUser", createUserRoute);
app.get("/getUserByToken", getUserByToken);
app.post("/signInUser", signInUser);

export default app;
