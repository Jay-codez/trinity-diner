const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDb = require("./db/connect-db");
const passport = require("passport");
const fileUpload = require("express-fileupload")
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const session = require("cookie-session");
const User = require("./models/user");
const fs = require("fs-extra");
const {
    findAll,
    findById,
    create,
    findByCategory,
} = require("./controllers/food-item");

require("dotenv/config");

const cors = require('cors');


const app = express();


const PORT = 3000;

app.use(cors({
    origin: "*"
}));


app.use(express.urlencoded({ extended: true, limit: "500mb" }))
app.use(express.json({ limit: "500mb" }))

app.set("view engine", "ejs");

app.use("/", express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(cookieParser())

app.use(session({
    secret: 'cartdemo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
}))


app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});


app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/", async(req, res) => {
    const data = await findAll(req, res);
    res.render("food-item", { title: "Item View", data });
});

app.get("/find/:id", async(req, res) => {
    const foodItem = await findById(req, res);


    res.render("index", { title: "Home", foodItem });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

app.get("/menu", async(req, res) => {

    const foodItems = await foodItem.find();

    res.render("menu", { title: "Menu", foodItems });
});



app.use((req, res, next) => {
    res.locals.current_user = req.user;

    next();
});

app.get((req, res, next) => {
    res.locals.cart = req.session.cart;

    next();
});

const contactRouter = require("./routes/contact");
const checkoutRouter = require("./routes/checkout");
const userRouter = require("./routes/user");
const fooditemRouter = require("./routes/food-item")
const cartRouter = require("./routes/cart")

const foodItem = require("./models/food-item")
app.use(userRouter);
app.use(contactRouter);
app.use(checkoutRouter);
app.use("/food-item", fooditemRouter);
app.use("/cart", cartRouter);


/* const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now())
  }
});

const upload = multer({ storage: storage });

const imgModel = require("./models/food-items"); */

/* app.use((req, res) => {
  res.status(404).send("<h1>404 page</h1>")
}); */


const start = async() => {
    try {
        await connectDb();
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();