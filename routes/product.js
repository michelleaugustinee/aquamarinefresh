const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Pemanggilan function Add Product
router.get("/addpro", (req, res) => {
  res.render("pages/addpro");
});

// Menambahkan product baru
router.post("/addpro", async (req, res) => {
  const imagePath = req.body.imagePath;
  const link = req.body.link;
  const name = req.body.name;
  const price = req.body.price;
  const status = req.body.status;

  const addpro = new Product({
    imagePath: imagePath,
    link: link,
    name: name,
    price: price,
    status: status,
  });

  await addpro.save((err, res) => {
    if (err) console.error(err);
    else {
      console.log(err);
    }
  });
  req.flash("message", "New product has been added!");
  res.redirect("/dashboard");
});

// Menghapus product
router.get("/delete/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      req.flash("message", "Product has been deleted!");
      res.redirect("/dashboard");
    } else {
      console.log(err);
    }
  });
});

// Menampilkan data product yang akan diedit
router.get("/editpro/:id", (req, res, next) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      res.render("pages/editpro", { products: data });
    }
  );
});

// Mengupdate product
router.post("/editpro/:id", (req, res, next) => {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      console.log("Update gagal");
      next(err);
    } else {
      req.flash("message", "Product has been updated!");
      res.redirect("/dashboard");
    }
  });
});

module.exports = router;
