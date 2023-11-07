import { Router, Request, Response, NextFunction } from "express";
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

routes.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.name === "ForbiddenError") {
    return res.redirect("/403");
  }
  console.log("ERROR-Name:", error.name, "\nERROR-Message:", error.message);
});

export default routes;
