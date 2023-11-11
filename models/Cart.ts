import { Request } from "express";
import { Document, Schema, Types } from "mongoose";
import { IProduct } from "./Product";

interface ICartProductItem {
  id: Types.ObjectId;
  count: number;
}

interface ICartProductPopulate {
  product: IProduct;
  count: number;
}

export interface ICart {
  products: ICartProductItem[];
  total_price: number;
}

export interface ICartPopulate {
  products: ICartProductPopulate[];
  total_price: number;
}

export const addToCart = (
  req: Request,
  productId: Types.ObjectId,
  productPrice: number
) => {
  const cart: ICart = {
    products: [
      {
        id: productId,
        count: 1,
      },
    ],
    total_price: productPrice,
  };
  const old_cart = req.session.cart;
  if (old_cart) {
    cart.products = old_cart.products;
    cart.total_price = old_cart.total_price;
    const productIndex = old_cart.products.findIndex((p) =>
      productId.equals(p.id)
    );
    if (productIndex !== -1) {
      cart.products[productIndex].count++;
      cart.total_price += productPrice;
    } else {
      cart.products.push({
        id: productId,
        count: 1,
      });
      cart.total_price += productPrice;
    }
  }
  cart.total_price = +cart.total_price.toFixed(2);
  req.session.cart = cart;
};

export const removeFromCart = (
  req: Request,
  productId: Types.ObjectId,
  productPrice: number
) => {
  const old_cart = req.session.cart;
  if (!old_cart) return false;
  const cart = old_cart;
  cart.products = old_cart.products.filter((product) => {
    if (productId.equals(product.id)) {
      product.count--;
      cart.total_price -= productPrice;
    }
    if (!product.count) return false;
    return true;
  });
  cart.total_price = +cart.total_price.toFixed(2);
  return true;
};
