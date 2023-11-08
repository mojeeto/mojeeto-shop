import { Router } from "express";
import {
  getManageProducts,
  getManageUsers,
} from "../controllers/adminController";
import { isAuthenticate } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";

const adminRouter = Router();

adminRouter.get("/manage-products", isAuthenticate, isAdmin, getManageProducts);
adminRouter.get("/manage-users", isAuthenticate, isAdmin, getManageUsers);

export default adminRouter;
