import { Router } from "express";
import {
  getAddToCart,
  getCart,
  getRemoveFromCart,
} from "../controllers/cartController";

const cartRouter = Router();

cartRouter.get("/", getCart);
cartRouter.get("/:productId", getAddToCart);
cartRouter.get("/remove/:productId", getRemoveFromCart);

export default cartRouter;
