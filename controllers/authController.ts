import User from "../models/User";
import { flashAddMessage } from "../util/flash";
import {
  getErrorValidationFieldMsg,
  getErrorValidationFields,
} from "../util/validation";
import { Controller } from "./controller";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const getLogin: Controller = (req, res, next) => {
  res.render("pages/auth/login", { path: "/login" });
};

export const postLogin: Controller = (req, res, next) => {
  const { email, password } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorsValidation = getErrorValidationFieldMsg(
      validationErrors.array()
    );
    const errorFields = getErrorValidationFields(validationErrors.array());
    return res.render("pages/auth/login", {
      path: "/login",
      values: { ...req.body },
      errors: errorsValidation,
      errorFields,
    });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        flashAddMessage(req, "error", "User not found. Please Sign-up first.");
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          req.session.isAuthenticated = true;
          req.session.save((err) => {
            if (err) return next(new Error("Error while set session value."));
            flashAddMessage(req, "Welcome", "Welcome to ");
            res.redirect("/");
          });
        } else {
          flashAddMessage(
            req,
            "EmailOrPasswordNotCorrect",
            "Email or Password not correct!"
          );
          return res.redirect("/login");
        }
      });
    })
    .catch((err) => next(new Error("Error while finding user in loginpage")));
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
  User.findOne({ email })
    .then((user) => {
      if (user) {
        flashAddMessage(req, "error", "Account with this email was created!");
        return res.redirect("/signup");
      }
      bcrypt
        .hash(password, 16)
        .then((hashedPassword) => {
          const newUser = new User({
            firstname,
            lastname,
            email,
            role: "CLIENT",
            password: hashedPassword,
          });
          return newUser.save();
        })
        .then((user) => {
          res.redirect("/login");
        })
        .catch((err) => next(new Error("Error while saveing new user")));
    })
    .catch((err) =>
      next(new Error("Error while searching user in postSignup"))
    );
};
