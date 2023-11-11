import {
  ICart,
  ICartPopulate,
  addToCart,
  removeFromCart,
} from "../models/Cart";
import Product from "../models/Product";
import { Controller } from "./controller";

export const getCart: Controller = (req, res, next) => {
  const sessionCart = req.session.cart;
  const cart: ICartPopulate = { products: [], total_price: 0 };
  if (!sessionCart) return res.render("pages/cart", { cart, path: "/cart" });
  const ids = sessionCart.products.map((p) => p.id);
  Product.find({ _id: { $in: ids } })
    .then((products) => {
      if (products) {
        products.forEach((product) => {
          const productInCart = sessionCart.products.findIndex(
            (p) => p.id === product.id
          );
          if (productInCart === -1) return;
          cart.products.push({
            product,
            count: sessionCart.products[productInCart].count,
          });
        });
        cart.total_price = sessionCart.total_price;
        return res.render("pages/cart", { cart, path: "/cart" });
      }
      return res.render("pages/cart", { cart, path: "/cart" });
    })
    .catch((err) => next(err));
};

export const getAddToCart: Controller = (req, res, next) => {
  const { productId } = req.params;
  Product.findOne({ _id: productId })
    .then((product) => {
      if (!product) return next();
      addToCart(req, product._id, product.price);
      res.redirect("/cart");
    })
    .catch((err) => next(err));
};

export const getRemoveFromCart: Controller = (req, res, next) => {
  const { productId } = req.params;
  Product.findOne({ _id: productId })
    .then((product) => {
      if (!product || !removeFromCart(req, product._id, product.price))
        return next();
      res.redirect("/cart");
    })
    .catch((err) => next(err));
};
