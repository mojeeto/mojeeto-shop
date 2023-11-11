import Product from "../models/Product";
import { flashAddMessage } from "../util/flash";
import { Controller } from "./controller";

export const getShop: Controller = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("index", { path: "/", products });
    })
    .catch((err) => next(new Error("Error while getHome")));
};

export const getProduct: Controller = (req, res, next) => {
  const { productId } = req.params;
  Product.findOne({ _id: productId })
    .then((product) => {
      if (product) return res.render("pages/product", { product: product });
      next();
    })
    .catch((error) => next(error));
};
