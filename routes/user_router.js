const express = require('express');
const { regesterUser, loginUser, getAllUsers,getUserProfile } = require('../controllars/users/user_controllar')
const { Authenticated } = require("../middlewares/auth");
const route = express.Router();

route.post('/regester', regesterUser)
route.post('/login', loginUser)
route.get('/all',Authenticated,getAllUsers)
route.get('/profile',Authenticated,getUserProfile)
module.exports = route