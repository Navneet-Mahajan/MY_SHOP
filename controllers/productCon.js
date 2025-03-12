const mongoose = require("mongoose");
const moment = require("moment");
const Util = require("../Util/enc");
const productSchema = require("../models/productSchema");
const { memoryStorage } = require("multer");
const userSchema = require("../models/userSchema");
const { decrypt } = require("dotenv");
const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);
//Register Product

async function registerPro(req, res) {
  try {
    const product = await Product.insertOne({
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
      createdBy: req.user._id,
    });
    res.json({
      message: "Product registered Successfully",
      product: product,
    });
  } catch (error) {
    res.status(422).send("Could not register Your Product !!");
  }
}

//view Product

async function viewProduct(req, res) {
  try {
    //finding product by ID
    let product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found");
    }
    let merchant = await User.findById(product.createdBy);
    //projecting the info
    const foundProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      merchant: {
        id: merchant._id,
        name: merchant.firstName + merchant.lastName,
        contact: Util.decrypt(merchant.email),
        profileImage: merchant.profileImage,
      },
    };
    res.json({
      message: "result",
      product: foundProduct,
    });
  } catch (err) {
    res.status(404).json({
      message: "Product not found",
      errorStack: err,
    });
  }
}

//list all Products

async function listAll() {
  try {
    const allproduct = await Product.find(
      {},
      { id: 1, name: 1, price: 1, image: 1 }
    );
    if (!allproduct) {
      throw new Error("NOT FOUND");
    }
    res.json({
      message: "ALL PRODUCTS",
      products: allproduct,
    });
  } catch (error) {
    res.status(404).send("Error found :", error);
  }
}

//Update Products
async function updateProduct(req, res) {
  try {
    //checking if profile Image is uploaded or not
    let profileImage = null;
    if (req.file) {
      profileImage = req.file.path;
    }
    const prodId = req.params.id;
    const product = await Product.findById(prodId);
    //checking if user._id is same as the id of merchant who created product
    if (!req.user._id.toString() === product.createdBy.toString()) {
      throw new Error("Invalid Merchant for this product");
    }

    const updatedData = {
      name: req.body.name || product.name,
      price: req.body.price || product.price,
      image: profileImage || product.image,
      updatedAt: moment().format(),
    };
    //updating the requested information
    const updatedProuduct = await Product.findByIdAndUpdate(
      prodId,
      updatedData,
      { new: true }
    );
    res.send(updatedProuduct);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
}

module.exports = { registerPro, viewProduct, listAll, updateProduct };
