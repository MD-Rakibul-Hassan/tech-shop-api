const express = require('express')
const {addProduct,getAllProduct,getProductById,updateProductById,deleteProductById} = require('../controllars/products/product_controllar')
const route = express.Router();

route.post('/add',addProduct)
route.get('/all',getAllProduct)
route.get('/:id',getProductById)
route.put('/:id',updateProductById)
route.delete('/:id',deleteProductById)

module.exports = route