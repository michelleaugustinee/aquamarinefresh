const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// Middleware untuk memetakan permintaan
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

// Koneksi ke database mongodb
mongoose.connect(
  "mongodb+srv://Kelompok_6:kelompok6aquamarine@cluster0.hjgrw.mongodb.net/Aquamarine?retryWrites=true&w=majority",
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database terhubung");
    }
  }
);

// Routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const wishlistRouter = require("./routes/wishlist");
const productRouter = require("./routes/product");

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/product", productRouter);

// Port untuk localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server sudah berjalan di port ${PORT}`);
});
