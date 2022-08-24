import express from "express";
import { createUserRoute } from "./tasks/createUser";
import { getUserByToken } from "./tasks/getUserByToken";
import { signInUser } from "./tasks/signInUser";

import passport from "passport";
import { googleAuthRoute } from "./tasks/googleAuth";
import { githubAuthRoute } from "./tasks/githubAuth";

const app = express.Router();

app.post("/createUser", createUserRoute);
app.get("/getUserByToken", getUserByToken);
app.post("/signInUser", signInUser);

app.get(
  "/googleAuth",
  passport.authenticate("google", {
    failureRedirect: "/auth/authFail",
  }),
  googleAuthRoute
);

app.get(
  "/githubAuth",
  passport.authenticate("github", { failureRedirect: "/auth/authFail" }),
  githubAuthRoute
);

app.get("/authFail", (req, res) => {
  res.status(500).json({ error: "Hubo un error" });
});

export default app;
