import { Router } from "express";

const shopRouter = Router();

// Home Page
shopRouter.get("/", (req, res, next) => {
  res.send("<h1>Shop Index</h1>");
});

export default shopRouter;
