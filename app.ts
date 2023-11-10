import express from "express";
import routes from "./routes";
import { pathJoin } from "./util/filesystem";
import mongoose from "mongoose";
import env from "./util/env";
import sessionMiddleware from "./middleware/sessionMiddleware";
import csrfMiddleware from "./middleware/csrfMiddleware";
import parserMiddleware from "./middleware/parserMiddleware";
import flash from "connect-flash";
import alertMiddleware from "./middleware/alertMiddleware";

const app = express();

app.set("view engine", "ejs");
app.use(parserMiddleware);
app.use(express.static(pathJoin("public")));
app.use("/images", express.static(pathJoin("images")));
app.use(sessionMiddleware);
app.use(csrfMiddleware);
app.use(flash());
app.use(alertMiddleware);

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
