const express = require('express')
const route = express.Router()
const { addAddress,getAddress } = require('../controllars/address/address_controllar')
const { Authenticated } = require("../middlewares/auth");

route.post("/add", Authenticated, addAddress);
route.get('/get', Authenticated, getAddress);

module.exports = route