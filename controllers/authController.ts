import User from "../models/User";
import { flashAddMessage } from "../util/flash";
import {
  getErrorValidationFieldMsg,
  getErrorValidationFields,
} from "../util/validation";
import { Controller } from "./controller";
import { validationResult } from "express-validator";

export const getLogin: Controller = (req, res, next) => {
  res.render("pages/auth/login", { path: "/login" });
};

export const postLogin: Controller = (req, res, next) => {
  const { email, password } = req.body;
  return res.render("pages/auth/login", {
    path: "/login",
    values: { ...req.body },
    errorMessage: "Email or Password not correct!",
    successMessage: "Welcome!",
    infoMessage: "User Created!",
  });
};

export const getSignup: Controller = (req, res, next) => {
  const errorValidation = validationResult(req);
  res.render("pages/auth/signup", {
    path: "/signup",
    errorValidation,
  });
};

export const postSignup: Controller = (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorValidation = getErrorValidationFieldMsg(
      validationErrors.array()
    );
    const errorFields = getErrorValidationFields(validationErrors.array());
    return res.render("pages/auth/signup", {
      path: "/signup",
      errors: errorValidation,
      errorFields,
      values: { ...req.body },
    });
  }
  flashAddMessage(req, "UserNotFound", "User was exists!");
  res.redirect("/signup");
  return;
  User.findOne({ email: email })
    .then((user) => {
      if (user) return res.redirect("/signup");
      const newUser = new User({
        firstname,
        lastname,
        email,
        role: "CLIENT",
        password,
      });
      newUser
        .save()
        .then((user) => {
          res.redirect("/login");
        })
        .catch((err) => next(new Error("Error while saveing new user")));
    })
    .catch((err) =>
      next(new Error("Error while searching user in postSignup"))
    );
};
