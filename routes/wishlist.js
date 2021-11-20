const express = require("express");
const Wishlist = require("../models/wishlist");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();

// Pemanggilan wishlist
router.get("/", function (req, res, next) {
  if (!req.session.wishlist) {
    return res.render("pages/wishlist", { products: 0 });
  }
  var wishlist = new Wishlist(req.session.wishlist);
  console.log(wishlist);
  res.render("pages/wishlist", {
    products: wishlist.generateArray(),
    totalPrice: wishlist.totalPrice,
  });
});

// Pemanggilan function untuk menghapus product
router.get("/remove-w/:id", (req, res, next) => {
  const productId = req.params.id;
  const wishlist = new Wishlist(
    req.session.wishlist ? req.session.wishlist : {}
  );

  wishlist.removeItem(productId);
  req.session.wishlist = wishlist;
  res.redirect("/wishlist");
});

// Pemanggilan function untuk mengurangi product
router.get("/reduce-w/:id", (req, res, next) => {
  const productId = req.params.id;
  const wishlist = new Wishlist(
    req.session.wishlist ? req.session.wishlist : {}
  );

  wishlist.reduce(productId);
  req.session.wishlist = wishlist;
  res.redirect("/wishlist");
});

// Pemanggilan function untuk menambahkan product
router.get("/increase-w/:id", (req, res, next) => {
  const productId = req.params.id;
  const wishlist = new Wishlist(
    req.session.wishlist ? req.session.wishlist : {}
  );

  wishlist.increase(productId);
  req.session.wishlist = wishlist;
  res.redirect("/wishlist");
});

// Pemanggilan function untuk menambahkan product ke cart, menghapus product dari wishlist
router.get("/add-to-cart-from-wishlist/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  const wishlist = new Wishlist(
    req.session.wishlist ? req.session.wishlist : {}
  );
  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/productlist");
    }
    cart.add(product, product.id);
    wishlist.removeItem(productId);
    req.session.cart = cart;
    req.session.wishlist = wishlist;
    console.log(req.session.cart);
    res.redirect("/wishlist");
  });
});

module.exports = router;
