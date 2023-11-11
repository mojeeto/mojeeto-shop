import { Router } from "express";
import { getProduct, getShop } from "../controllers/shopController";

const shopRouter = Router();

shopRouter.get("/:productId", getProduct);
shopRouter.get("/", getShop);

export default shopRouter;
