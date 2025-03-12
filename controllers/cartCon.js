const mongoose = require("mongoose");
const cartSchema = require("../models/cartSchema");
const productSchema = require("../models/productSchema");
const userSchema = require("../models/userSchema");

//creating models
const Product = mongoose.model("Product", productSchema);
const Cart = mongoose.model("Cart", cartSchema);

//add to cart

async function addToCart(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }); // checking if cart exists or not
    console.log(cart);
    if (!cart) {
      Cart.create({
        // if cart does not exist , create new one
        userId: req.user._id,
        products: [req.body.productId],
      });
    } else {
      //if it already exists , push product to the pre-existing cart
      console.log(`adding ${req.body.productId} to the cart`);
      cart.products.push(req.body.productId);
    }
    await cart.save();
    res.json({
      message: "Product Added",
      addedProduct: req.body.productId,
    });
  } catch (error) {
    res.status(401).send(error);
  }
}

async function viewCart(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      throw new Error("Cart not found , for this user");
    }
    //findng the user's cart
    const userCart = await Cart.findOne({ userId: req.user._id }).populate(
      "products"
    );
    const products = userCart.products;
    const infoPromises = products.map(async (productId) => {
      let product = await Product.findById(productId);
      return {
        //mapping product id with essential info
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      };
    });
    const info = await Promise.all(infoPromises); // waiting till all the promise gets fullfilled
    res.json(info);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

module.exports = { addToCart, viewCart };
