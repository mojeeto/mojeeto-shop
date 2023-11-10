import { Router } from "express";
import { getShop } from "../controllers/shopController";

const shopRouter = Router();

// Home Page
shopRouter.get("/", getShop);

export default shopRouter;
