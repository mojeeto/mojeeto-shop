import { Controller } from "./controller";

export const getLogin: Controller = (req, res, next) => {
  res.render("pages/auth/login", { path: "/login" });
};

export const getSignup: Controller = (req, res, next) => {
  res.render("pages/auth/signup", { path: "/signup" });
};
