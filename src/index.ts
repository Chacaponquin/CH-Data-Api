import "./db/mongo";

import express, { Express, Response } from "express";
import http from "http";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import ROUTES from "./routes";
import timedOut from "connect-timeout";
import { Server } from "socket.io";

import { createContextUser } from "./shared/tasks/createContextUser";
import { SocketTasks } from "./socket/SocketTasks";

const PORT = process.env.PORT || 4000;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET_WORD as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

function haltOnTimedout(req: any, res: Response, next: any) {
  if (!req.timedout) next();
}

app.use(timedOut("300s"));
app.use(haltOnTimedout);

app.get("/", (req, res) => res.send("Hola Bienvenido"));

app.use("/", createContextUser);

app.use("/auth", ROUTES.AUTHENTICATION_ROUTES);
app.use("/util", ROUTES.UTIL_ROUTES);
app.use("/admin", ROUTES.ADMIN_ROUTES);
app.use("/user", ROUTES.USER_ROUTES);

app.use(passport.initialize());
app.use(passport.session());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["polling", "websocket"],
});

io.on("connection", SocketTasks);

httpServer.listen(PORT, () => console.log("Server running"));
