const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Pemanggilan function login
router.get("/login", (req, res) => {
  res.render("pages/login");
});

// Pemanggilan function signup
router.get("/signup", (req, res) => {
  res.render("pages/signup");
});

//Pemanggilan function logout
router.get("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  res.redirect("/");
});

// Mengecek password dan username saat login
router.post("/login", async (req, res, next) => {
  const password = req.body.password;
  const username = req.body.username;

  data = await User.find();
  await data.forEach((account) => {
    if (username == "admin" && password == "12345") {
      res.redirect("/dashboard");
    } else {
      if (username == account.username) {
        if (password == account.password) {
          req.session.isLoggedIn = true;
          res.redirect("/");
          next();
        } else {
          res.render("pages/login", { error: "Wrong Password!" });
          next();
        }
      }
    }
  });
  res.render("pages/login", { error: "Wrong Username!" });
});

// Mengecek hal-hal yang diperlukan saat signup
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const country = req.body.country;
  const address = req.body.address;
  const password = req.body.password;
  const password_ = req.body.password_;

  data = await User.find();
  await data.forEach((account) => {
    if (email == account.email) {
      res.render("pages/signup", { error: "Email has been registered!" });
    }
  });

  await data.forEach((account) => {
    if (username == account.username) {
      res.render("pages/signup", { error: "Username has been used!" });
    }
  });

  if (password != password_) {
    res.render("pages/signup", { error: "Password doesn't match!" });
  } else {
    const user = new User({
      username: username,
      email: email,
      password: password,
      name: name,
      phone: phone,
      country: country,
      address: address,
    });
    await user.save((err, res) => {
      if (err) console.error(err);
      else {
        console.log("Sign In Successful!");
      }
    });
    req.session.isLoggedIn = true;
    res.redirect("/");
  }
});

module.exports = router;
