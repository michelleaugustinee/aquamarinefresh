const express = require("express");
const Product = require("../models/product");
const ProductIndex = require("../models/product");
const Wishlist = require("../models/wishlist");
const Cart = require("../models/cart");
const router = express.Router();

// Pemanggilan database yang dipakai di product Index
router.get("/", async (req, res) => {
  var data = await ProductIndex.find();
  res.render("pages/index", { products: data });
});

// Pemanggilan Database yang dipakai di Product List
router.get("/productlist", async (req, res) => {
  var data = await Product.find();
  res.render("pages/productlist", { products: data });
});

router.get("/addpro", (req, res) => {
  res.render("pages/addpro");
});

// Pemanggilan Database yang dipakai di Dashboard
router.get("/dashboard", async (req, res) => {
  var data = await Product.find();
  res.render("pages/dashboard", {
    products: data,
    message: req.flash("message"),
  });
});

router.get("/changepass", (req, res) => {
  res.render("pages/changepass");
});

router.get("/checkout", (req, res) => {
  res.render("pages/checkout");
});

router.get("/crab", (req, res) => {
  res.render("pages/crab");
});

// Pemanggilan Database yang dipakai di Edit data
router.get("/editpro", async (req, res) => {
  var data = await Product.find();
  res.render("pages/editpro", { products: data });
});

router.get("/editmyprofile", (req, res) => {
  res.render("pages/editmyprofile");
});

router.get("/emailverify", (req, res) => {
  res.render("pages/emailverify");
});

router.get("/forget", (req, res) => {
  res.render("pages/forget");
});

router.get("/forget2", (req, res) => {
  res.render("pages/forget2");
});

router.get("/lobster", (req, res) => {
  res.render("pages/lobster");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/myprofile", (req, res) => {
  res.render("pages/myprofile");
});

router.get("/newadd", (req, res) => {
  res.render("pages/newadd");
});

router.get("/octopus", (req, res) => {
  res.render("pages/octopus");
});

router.get("/orderhistory", (req, res) => {
  res.render("pages/orderhistory");
});

router.get("/payment", (req, res) => {
  res.render("pages/payment");
});

router.get("/phoneverify", (req, res) => {
  res.render("pages/phoneverify");
});

router.get("/redsnapper", (req, res) => {
  res.render("pages/redsnapper");
});

router.get("/salmon", (req, res) => {
  res.render("pages/salmon");
});

router.get("/scallop", (req, res) => {
  res.render("pages/scallop");
});

router.get("/shrimp", (req, res) => {
  res.render("pages/shrimp");
});

router.get("/signup", (req, res) => {
  res.render("pages/signup");
});

router.get("/squid", (req, res) => {
  res.render("pages/squid");
});

// Menambahkan Produk yang diinginkan ke dalam Wishlist dari Page Product List
router.get("/add-to-wishlist/:id", (req, res) => {
  const productId = req.params.id;
  const wishlist = new Wishlist(
    req.session.wishlist ? req.session.wishlist : {}
  );

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/productlist");
    }
    wishlist.add(product, product.id);
    req.session.wishlist = wishlist;
    res.redirect("/productlist");
  });
});

// Menambahkan Produk yang diinginkan ke dalam Cart dari Page Product List
router.get("/add-to-cart/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/productlist");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/productlist");
  });
});

module.exports = router;
