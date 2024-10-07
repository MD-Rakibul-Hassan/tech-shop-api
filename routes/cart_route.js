const express = require('express');
const route = express.Router();
const { addToCart, getUserCart, removeProductToCart, removeAllProductToCart, decriseProduct } = require('../controllars/cart/cart_controllar')
const { Authenticated } = require('../middlewares/auth')



route.post('/add',Authenticated, addToCart)
route.post("/--qty", Authenticated, decriseProduct);
route.get("/user", Authenticated, getUserCart);

route.delete("/remove/:id", Authenticated, removeProductToCart);
route.delete("/clear", Authenticated, removeAllProductToCart);



module.exports = route