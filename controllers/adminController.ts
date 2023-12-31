import { validationResult } from "express-validator";
import { Controller } from "./controller";
import {
  GetErrorValidationDataResult,
  getErrorValidationFieldMsg,
  getErrorValidationFields,
} from "../util/validation";
import Product from "../models/Product";
import { Types } from "mongoose";
import { flashAddMessage } from "../util/flash";

export const getManageProducts: Controller = (req, res, next) => {
  Product.find({ creatorId: req.session.userId })
    .then((products) => {
      res.render("pages/admin/manage-products", {
        products,
        path: "/manage-products",
      });
    })
    .catch((err) =>
      next(new Error("ERROR while fetch products in getManageProducts"))
    );
};

export const getManageUsers: Controller = (req, res, next) => {
  res.render("pages/admin/manage-users");
};

export const getAddProduct: Controller = (req, res, next) => {
  res.render("pages/admin/add-update-product");
};

export const postAddProduct: Controller = (req, res, next) => {
  const { title, price, quantity, description } = req.body;
  const validationErrors = validationResult(req);
  const image = req.file;
  if (!validationErrors.isEmpty()) {
    const errorsValidation = getErrorValidationFieldMsg(
      validationErrors.array()
    );
    const errorFields = getErrorValidationFields(validationErrors.array());
    return res.render("pages/admin/add-update-product", {
      path: "/manage-products",
      values: { ...req.body },
      errors: errorsValidation,
      errorFields,
    });
  }
  if (!image) {
    const errors: GetErrorValidationDataResult[] = [
      { field: "Image", message: "Your image is not correct or is empty." },
      { field: "Image", message: "Your image must jpg or png" },
    ];
    return res.render("pages/admin/add-update-product", {
      path: "/manage-products",
      values: { ...req.body },
      errors,
      errorFields: ["image"],
    });
  }
  const product = new Product({
    title,
    price,
    quantity_available: quantity,
    description,
    imagePath: image.path,
    creatorId: new Types.ObjectId(req.session.userId),
  });
  product
    .save()
    .then((product) => {
      if (product.isNew)
        flashAddMessage(req, "success", "Product Successfully added!");
      res.redirect("/manage-products");
    })
    .catch((err) => next(new Error("Error while create new Product!")));
};

export const getEditProduct: Controller = (req, res, next) => {
  const { productId } = req.params;
  Product.findOne({ _id: productId })
    .then((product) => {
      if (!product) return res.redirect("/manage-products");
      res.render("pages/admin/add-update-product", {
        values: {
          title: product.title,
          price: product.price,
          quantity: product.quantity_available,
          description: product.description,
          id: productId,
        },
        edit: true,
      });
    })
    .catch((err) =>
      next(new Error("Error while finding product in getEditProduct"))
    );
};

export const postEditProduct: Controller = (req, res, next) => {
  const { productId } = req.params;
  const { title, price, quantity, description } = req.body;
  const image = req.file;
  Product.findOne({ _id: productId })
    .then((product) => {
      if (product) {
        product.title = title;
        product.price = price;
        product.quantity_available = quantity;
        product.description = description;
        if (image) {
          product.imagePath = image.path;
        }
        return product.save();
      } else {
        flashAddMessage(req, "error", "Product Not Found!");
        res.redirect("/manage-products");
      }
    })
    .then((updatedProduct) => {
      flashAddMessage(req, "success", "Product Updated!");
      res.redirect("/manage-products");
    })
    .catch((err) => next(new Error(err)));
};

export const postDeleteProduct: Controller = (req, res, next) => {
  const { productId } = req.params;
  Product.findOneAndDelete({ _id: productId })
    .then((product) => {
      flashAddMessage(req, "info", "Product Deleted!");
      res.redirect("/manage-products");
    })
    .catch((err) => next(err));
};
