import { Router } from "express";
import { getLogin, getSignup } from "../controllers/authController";

const authRouter = Router();

authRouter.get("/login", getLogin);
authRouter.get("/signup", getSignup);

export default authRouter;
