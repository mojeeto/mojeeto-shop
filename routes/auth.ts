import { Router } from "express";
import {
  getLogin,
  getSignup,
  logout,
  postLogin,
  postSignup,
} from "../controllers/authController";
import {
  isAuthenticate,
  isNotAuthenticate,
} from "../middleware/authMiddleware";
import { body } from "express-validator";

const authRouter = Router();

authRouter.get("/login", isNotAuthenticate, getLogin);
authRouter.get("/signup", isNotAuthenticate, getSignup);
authRouter.get("/logout", isAuthenticate, logout);

authRouter.post(
  "/signup",
  isNotAuthenticate,
  [
    body("email", "Email is not correct!").isEmail().normalizeEmail().trim(),
    body(
      "password",
      "Password most contain alphabet and numbers. Password Length most between 4 & 32."
    )
      .isAlphanumeric()
      .isLength({ min: 4 }),
    body("repeatpassword", "Passwords not matched!").custom(
      (repeatedPassword, meta) => repeatedPassword === meta.req.body.password
    ),
  ],
  postSignup
);
authRouter.post("/login", postLogin);

export default authRouter;
