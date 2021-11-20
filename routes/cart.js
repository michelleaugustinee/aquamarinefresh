const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const Product = require("../models/product");

// Pemanggilan cart
router.get("/", function(req, res, next) {
    if (!req.session.cart) {
        return res.render("pages/cart", { products: 0 });
    }
    var cart = new Cart(req.session.cart);
    res.render("pages/cart", { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

// Pemanggilan function untuk menghapus product
router.get("/remove/:id", (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
 
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect("/cart");
 });
 
 // Pemanggilan function untuk mengurangi product
 router.get("/reduce/:id", (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
 
    cart.reduce(productId);
    req.session.cart = cart;
    res.redirect("/cart");
 });
 
 // Pemanggilan function untuk menambahkan product
 router.get("/increase/:id", (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
 
    cart.increase(productId);
    req.session.cart = cart;
    res.redirect("/cart");
 });

// Pemanggilan function untuk menambahkan product ke dalam wishlist dari cart, dan menghapus product dari cart
router.get("/add-to-wishlist-from-cart/:id", (req, res, next) => {
    const productId = req.params.id;
    const wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect("/productlist");
        }
        wishlist.add(product, product.id);
        cart.removeItem(productId);
        req.session.wishlist = wishlist;
        req.session.cart = cart;
        console.log(req.session.wishlist);
        res.redirect("/cart");
    });
});

module.exports = router;