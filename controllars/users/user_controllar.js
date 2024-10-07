const User = require('../../models/user/user_models')

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const regesterControllar = {};
// Regester user //
regesterControllar.regesterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.json({message:"User Already Exist", success:false})
        }
        const hashPass = await bcrypt.hash(password, 10);
        
        user = await User.create({ name, email, password:hashPass })
        res.status(200).json({message:"User Created Successfully done", user, success:true})

    }
    catch (error) {
        res
          .status(404)
          .json({ message: error.message, success: false });
    }
}
// Login user //
regesterControllar.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.json({message:'User Not Found',success:false})
        }
        let validPassword = await bcrypt.compare(password, user.password)
        
        if (!validPassword) {
            return res.json({message:"Invalid Credential",success:false})
        }
        // Jwt token 
        const token = jwt.sign({ userId: user._id }, process.env.SECKRET_KEY,  { expiresIn: '60d' } );
        
        res.json({message:`Welcome ${user.name}`,success:true,token})
    }
    catch (error) {
        res.json({message:error.message})
    }
}

// All users //
regesterControllar.getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find().sort({ createdAt: -1 })
        res.json(allUsers)
    }
    catch (error) {
        res.json({message:error.message})
    }
}
// Get user profile //
regesterControllar.getUserProfile = async (req, res) => {
    try {
        res.json({user:req.user})
    }
    catch (error) {
        res.json({message:error.message})
    }
}
module.exports = regesterControllar;