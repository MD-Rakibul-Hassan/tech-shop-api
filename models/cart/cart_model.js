const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quentity: {
    type: Number,
    required: true,
  },
    imgSrc: {
        type: String,
        required:true
  }
})


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    items:[cartItemsSchema]
})


const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart