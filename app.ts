import express from "express";
import routes from "./routes";
import { pathJoin } from "./util/filesystem";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static(pathJoin("public")));

app.use(routes);

const mongoUrl = process.env.MONGO_URL_CONNECT;
const mongoDb = process.env.MONGO_URL_DB;
mongoose
  .connect(mongoUrl! + mongoDb!)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Error: Bad url for connecting DB!\n", err);
    process.exit();
  });
