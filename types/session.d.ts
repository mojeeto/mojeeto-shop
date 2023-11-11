import * as session from "express-session";
import { ICart } from "../models/Cart";

declare module "express-session" {
  interface SessionData {
    isAuthenticated: boolean;
    isAdmin: boolean;
    userId: string;
    cart: ICart;
  }
}
