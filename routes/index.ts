import { Router } from "express";
import shopRouter from "./shop";
import authRouter from "./auth";

const routes = Router();

routes.use(authRouter);
routes.use("/", shopRouter);

routes.use("/403", (req, res, next) => {
  res.render("pages/403");
});

// for handling 404 routes
routes.use((req, res, next) => {
  res.render("pages/404");
});

export default routes;
