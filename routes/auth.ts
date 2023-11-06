import { Router } from "express";
import { getLogin, getSignup, postSignup } from "../controllers/authController";
import { isNotAuthenticate } from "../middleware/authMiddleware";
import { body } from "express-validator";

const authRouter = Router();

authRouter.get("/login", isNotAuthenticate, getLogin);
authRouter.get("/signup", isNotAuthenticate, getSignup);

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

export default authRouter;
