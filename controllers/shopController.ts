import { Controller } from "./controller";

export const getHome: Controller = (req, res, next) => {
  res.render("index", { path: "/" });
};

export const getShop: Controller = (req, res, next) => {
  res.redirect("/");
};
