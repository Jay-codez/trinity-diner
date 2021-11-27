const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload=require("express-fileupload")
const connectDb = require("./db/connect-db");
const foodItemAdminRouter = require("./routes/food-item-admin-routes")
const OrdersRouter = require("./routes/orders-routes")
const EOrdersRouter = require("./routes/e-orders-routes")
const session = require("cookie-session");

//const _ = require("lodash");

const app = express();



const PORT = 4000;

app.use(session({
  secret: 'cartdemo',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))



app.set("view engine", "ejs");
app.use("/", express.static("assets"));
app.use(fileUpload())
// app.use(express.urlencoded({extended:true}))
// app.use(express.json())

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get((req, res) => {
  res.status(4040).render("404");
});


app.use(foodItemAdminRouter)
app.use(OrdersRouter)
app.use(EOrdersRouter)

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server(admin) is running port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
