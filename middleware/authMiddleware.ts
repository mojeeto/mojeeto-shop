import { Middleware } from "./middleware";

export const IsAuthenticate: Middleware = (req, res, next) => {
  if (!req.session.isAuthenticated) res.redirect(403, "/");
  next();
};

export const IsNotAuthenticate: Middleware = (req, res, next) => {
  if (req.session.isAuthenticated) res.redirect(200, "/");
  next();
};
