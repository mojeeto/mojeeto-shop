import csurf from "csurf";
import { Router } from "express";

const csrfMiddleware = Router();

csrfMiddleware.use(csurf());
csrfMiddleware.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

export default csrfMiddleware;
