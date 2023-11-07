import { Middleware } from "./middleware";
import SessionMongoConnect from "connect-mongo";
import env from "../util/env";
import session from "express-session";

const session_store = SessionMongoConnect.create({
  mongoUrl: env.MONGO_URL_CONNECT + env.MONGO_URL_DB,
  collectionName: env.SESSION_COLLECTION_NAME,
});

const sessionMiddleware: Middleware = session({
  secret: env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: session_store,
});

export default sessionMiddleware;
