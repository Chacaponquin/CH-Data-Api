import "./db/mongo";

import express, { Express, Response } from "express";
import http from "http";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import ROUTES from "./routes";
import timedOut from "connect-timeout";
import { Server } from "socket.io";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { SocketTasks } from "./socket/SocketTasks";

const PORT = process.env.PORT || 8000;

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

app.use("/", ROUTES);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "profile"],
      callbackURL: "/auth/googleAuth",
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile._json);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      callbackURL: "/auth/githubAuth",
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      cb(null, profile._json);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

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
