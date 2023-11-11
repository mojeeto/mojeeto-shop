import { Router } from "express";
import { getProduct, getShop } from "../controllers/shopController";

const shopRouter = Router();

// Home Page
shopRouter.get("/", getShop);
shopRouter.get("/:productId", getProduct);

export default shopRouter;
