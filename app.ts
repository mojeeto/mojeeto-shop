import express from "express";
import routes from "./routes";

const app = express();

// routes
app.use(routes);

app.listen(3000);
