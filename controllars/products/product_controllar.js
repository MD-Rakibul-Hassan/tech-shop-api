const Product = require('../../models/product/product_models');
const express = require('express');

const productControllar = {};

productControllar.addProduct = async (req, res) => {
    try {
        const {
          title,
          description,
          price,
          category,
          quentity,
          imgSrc,
          createdAt,
        } = req.body;
        let product = await Product.create({
          title,
          description,
          price,
          category,
          quentity,
          imgSrc,
          createdAt,
        })
        res.json({message:"Product created successfully",product,success:true})
    }
    catch (error) {
        res.json({message:error.message})
    }
}

productControllar.getAllProduct = async (req, res) => {
  try {
    let allProduct = await Product.find().sort({ createdAt: -1 })
    res.json({message:"All Products",allProduct,success:true})
  }
  catch (error) {
    res.json({message:error.message})
  }
}

productControllar.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.json({ message: "Invalid Id", success: false });
    }
    res.json({message:"Founded Product",product,success:true})
  }
  catch (error) {
    res.json({message:error.message})
  }
}
productControllar.updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true })
    if (!product) {
      return res.json({message:"Invalid Id",success:false})
    }
    res.json({message:"User has been updated",success:true,product})
  }
  catch (error) {
    res.json({message:error.message})
  }
}
productControllar.deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    let deletedProduct = await Product.findByIdAndDelete(id);
    res.json({message:"Product deleted successfully",deletedProduct,success:true})
    
  }
  catch (error) {
    res.json({message:"Product deleted sussfully"})
  }
}
module.exports = productControllar;