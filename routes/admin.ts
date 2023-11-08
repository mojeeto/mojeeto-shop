import { Router } from "express";
import {
  getAddProduct,
  getManageProducts,
  getManageUsers,
  postAddProduct,
} from "../controllers/adminController";
import { isAuthenticate } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";
import { body } from "express-validator";

const adminRouter = Router();

adminRouter.get("/manage-products", isAuthenticate, isAdmin, getManageProducts);
adminRouter.get("/manage-users", isAuthenticate, isAdmin, getManageUsers);
adminRouter.get("/add-product", isAuthenticate, isAdmin, getAddProduct);

adminRouter.post(
  "/add-product",
  isAuthenticate,
  isAdmin,
  [
    body("title")
      .isAlphanumeric()
      .withMessage("Name must alphanumeric.")
      .isLength({ min: 2, max: 32 })
      .withMessage("Name length between 2 & 32 character."),
    body(
      "description",
      "The description length most be between 25 and 255 character."
    ).isLength({ min: 25, max: 255 }),
  ],
  postAddProduct
);

export default adminRouter;
