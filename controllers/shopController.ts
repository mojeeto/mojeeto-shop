import Product from "../models/Product";
import { Controller } from "./controller";

export const getShop: Controller = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("index", { path: "/", products });
    })
    .catch((err) => next(new Error("Error while getHome")));
};
