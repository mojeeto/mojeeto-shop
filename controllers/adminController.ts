import { Controller } from "./controller";

export const getManageProducts: Controller = (req, res, next) => {
  res.render("pages/admin/manage-products");
};

export const getManageUsers: Controller = (req, res, next) => {
  res.render("pages/admin/manage-users");
};
