import { flashGetAllMessages } from "../util/flash";
import { Middleware } from "./middleware";

const alertMiddleware: Middleware = (req, res, next) => {
  res.locals.alertMessages = flashGetAllMessages(req);
  next();
};

export default alertMiddleware;
