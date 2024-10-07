const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user/user_models')
require('dotenv').config()







const Authenticated = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.json({message:'Login first!'})
    }
    const decoded = jwt.verify(token, process.env.SECKRET_KEY);

    let id = decoded.userId;
    let user = await User.findById(id)
    if (!user) {
        return res.json({message:"User not exist"})
    }
    req.user = user
    next()

}

module.exports = { Authenticated };
