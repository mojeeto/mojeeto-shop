import express from "express";
import routes from "./routes";
import { pathJoin } from "./util/filesystem";

const app = express();

// register template engine
app.set("view engine", "ejs");
// define static folders
app.use(express.static(pathJoin("public")));

// routes
app.use(routes);

app.listen(3000);
