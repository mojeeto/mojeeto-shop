import { Router } from "express";
import {
  getAddProduct,
  getManageProducts,
  getManageUsers,
} from "../controllers/adminController";
import { isAuthenticate } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";

const adminRouter = Router();

adminRouter.get("/manage-products", isAuthenticate, isAdmin, getManageProducts);
adminRouter.get("/manage-users", isAuthenticate, isAdmin, getManageUsers);
adminRouter.get("/add-product", isAuthenticate, isAdmin, getAddProduct);

export default adminRouter;
