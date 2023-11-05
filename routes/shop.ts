import { Router } from "express";

const shopRouter = Router();

// Home Page
shopRouter.get("/", (req, res, next) => {
  res.render("index");
});

export default shopRouter;
