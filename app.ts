import express from "express";
import session from "express-session";
import SessionMongoConnect from "connect-mongo";
import routes from "./routes";
import { pathJoin } from "./util/filesystem";
import mongoose from "mongoose";
import env from "./util/env";
import bodyParser from "body-parser";

const app = express();

const session_store = SessionMongoConnect.create({
  mongoUrl: env.MONGO_URL_CONNECT + env.MONGO_URL_DB,
  collectionName: env.SESSION_COLLECTION_NAME,
});

app.set("view engine", "ejs");
app.use(express.static(pathJoin("public")));
app.use(
  session({
    secret: env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: session_store,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

mongoose
  .connect(env.MONGO_URL_CONNECT + env.MONGO_URL_DB)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Error: Bad url for connecting DB!\n", err);
    process.exit();
  });
