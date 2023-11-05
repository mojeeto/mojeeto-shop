import express from "express";
import routes from "./routes";
import { pathJoin } from "./util/filesystem";

const app = express();

app.set("view engine", "ejs");
app.use(express.static(pathJoin("public")));

app.use(routes);

app.listen(3000);
