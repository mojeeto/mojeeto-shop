import { Middleware } from "./middleware";
import SessionMongoConnect from "connect-mongo";
import env from "../util/env";
import session from "express-session";
import { Router } from "express";

const session_store = SessionMongoConnect.create({
  mongoUrl: env.MONGO_URL_CONNECT + env.MONGO_URL_DB,
  collectionName: env.SESSION_COLLECTION_NAME,
});

const sessionMiddleware = Router();
sessionMiddleware.use(
  session({
    secret: env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: session_store,
  })
);
sessionMiddleware.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

export default sessionMiddleware;
