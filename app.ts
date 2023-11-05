import express from "express";
import routes from "./routes";

const app = express();

// register template engin
app.set("view engine", "ejs");

// routes
app.use(routes);

app.listen(3000);
