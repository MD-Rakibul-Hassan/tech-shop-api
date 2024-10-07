const express = require("express");
const Cart = require("../../models/cart/cart_model");

const cartControllar = {};

cartControllar.addToCart = async (req, res) => {
  try {
    const { productId, title, price, quentity, imgSrc } = req.body;

    const userId = req.user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quentity += quentity;
      cart.items[itemIndex].price += price * quentity;
    } else {
      cart.items.push({ productId, title, price, quentity, imgSrc });
    }

    await cart.save();

    res.json({ message: "Item added to cart", success: true, cart });
  } catch (error) {
    res.json({ message: error.message });
  }
};

cartControllar.getUserCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      res.json({ message: "Your cart is empty", success: false });
    }
    res.json({ message: "Cart items", success: true, cart });
  } catch (error) {
    res.json({ message: error.message });
  }
};

cartControllar.removeProductToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      res.json({ message: "Your cart is empty", success: false });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Cart has been removed ", success: true, cart });
  } catch (error) {
    res.json({ message: error.message });
  }
};

cartControllar.removeAllProductToCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart.items = new Cart({ items: [] });
  } else {
    cart.items = [];
  }
  await cart.save();
  res.json({ message: "All items removed", success: true });
};

cartControllar.decriseProduct = async (req, res) => {
  try {
    const { productId,  quentity } = req.body;

    const userId = req.user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      if (item.quentity > quentity) {
        const pricePerUnit = item.price / item.quentity;
        item.quentity -= quentity;
        item.price -= pricePerUnit * quentity;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.json({ message: "Invalid product id" });
    }

    await cart.save();

    res.json({ message: "Item decrised successfully", success: true, cart });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = cartControllar;
