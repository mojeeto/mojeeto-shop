import { Middleware } from "./middleware";

export const isAuthenticate: Middleware = (req, res, next) => {
  if (!req.session.isAuthenticated) res.redirect("/");
  next();
};

export const isNotAuthenticate: Middleware = (req, res, next) => {
  if (req.session.isAuthenticated) res.redirect("/");
  next();
};
