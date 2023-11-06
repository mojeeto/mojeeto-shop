import { Router } from "express";
import { getHome, getShop } from "../controllers/shopController";

const shopRouter = Router();

// Home Page
shopRouter.get("/", getHome);
shopRouter.get("/shop", getShop);

export default shopRouter;
