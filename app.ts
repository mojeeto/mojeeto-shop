import express from "express";
import routes from "./routes";
import { pathJoin } from "./util/filesystem";
import mongoose from "mongoose";
import env from "./util/env";
import sessionMiddleware from "./middleware/sessionMiddleware";
import csrfMiddleware from "./middleware/csrfMiddleware";
import parserMiddleware from "./middleware/parserMiddleware";

const app = express();

app.set("view engine", "ejs");
app.use(parserMiddleware);
app.use(express.static(pathJoin("public")));
app.use(sessionMiddleware);

app.use(csrfMiddleware);
app.use(routes);

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error.name === "ForbiddenError") {
      return res.redirect("/403");
    }
    console.log("ERROR-Name:", error.name, "\nERROR-Message:", error.message);
  }
);

mongoose
  .connect(env.MONGO_URL_CONNECT + env.MONGO_URL_DB)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Error: Bad url for connecting DB!\n", err);
    process.exit();
  });
