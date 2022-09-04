import express from "express";
import { userPrivateRoute } from "./helpers/userPrivateRoute";
import { createUserMessage } from "./tasks/createUserMessage";
import { deleteSchemaRoute } from "./tasks/deleteSchema";
import { getMySchemasRoute } from "./tasks/getMySchemas";

const app = express.Router();

app.use(userPrivateRoute);
app.get("/getMySchemas", getMySchemasRoute);
app.post("/deleteSchema", deleteSchemaRoute);
app.post("/createUserMessage", createUserMessage);

export default app;
