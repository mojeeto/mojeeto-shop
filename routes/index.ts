import { Router } from "express";
import shopRouter from "./shop";

const routes = Router();

routes.use("/", shopRouter);

// for handling 404 routes
routes.use((req, res, next) => {
  res.render("pages/404");
});

export default routes;
