import { Controller } from "./controller";

export const getManageProducts: Controller = (req, res, next) => {
  res.render("pages/admin/manage-products");
};

export const getManageUsers: Controller = (req, res, next) => {
  res.render("pages/admin/manage-users");
};

export const getAddProduct: Controller = (req, res, next) => {
  res.render("pages/admin/add-product");
};
