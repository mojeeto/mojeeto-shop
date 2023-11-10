import { validationResult } from "express-validator";
import { Controller } from "./controller";
import {
  GetErrorValidationDataResult,
  getErrorValidationFieldMsg,
  getErrorValidationFields,
} from "../util/validation";
import Product from "../models/Product";

export const getManageProducts: Controller = (req, res, next) => {
  res.render("pages/admin/manage-products");
};

export const getManageUsers: Controller = (req, res, next) => {
  res.render("pages/admin/manage-users");
};

export const getAddProduct: Controller = (req, res, next) => {
  res.render("pages/admin/add-product");
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
    return res.render("pages/admin/add-product", {
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
    return res.render("pages/admin/add-product", {
      path: "/manage-products",
      values: { ...req.body },
      errors,
      errorFields: ["image"],
    });
  }
  res.redirect("/add-product");
};
