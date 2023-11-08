import { Middleware } from "./middleware";

export const isAdmin: Middleware = (req, res, next) => {
  if (!req.session.isAdmin) return res.redirect("/");
  next();
};
