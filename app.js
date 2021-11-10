const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDb = require("./db/connect-db");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy
const session = require("cookie-session");
const User = require("./models/user");
const fs = require("fs");
require("dotenv/config");

const cors = require('cors');


const app = express();

const contactRouter = require("./routes/contact");
const userRouter = require("./routes/user");
const fooditemRouter = require("./routes/food-item")

const PORT = 3000;

app.use(
  session({
    maxAge:30*24*60*60*1000,
    keys:["jaystro"]
  })
)

app.use(cors({
  origin: "*"
}));


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.use("/", express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

app.get("/menu", (req, res) => {
  res.render("menu", { title: "Menu" });
});

/* app.get("/cart", (req, res) => {
  res.render("cart", { title: "Sign Up" });
}); */

/* app.get("/signin", (req, res) => {
  const signin = new Signin({
    email: "new@email.com",
    password: "password1"
  });

  signin.save()
});
 */

// app.post("/add-account", (req, res) => {
//   const account = new Account(req.body);

//   account.save()
//     .then((result) => {
//       res.render("/signin");
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// });

// //const acc_id = req.params.id;

// app.get("/find-account", (req, res) => {
//   const id = req.params.id;
//   Signup.findById(id)
//     .then(result => {
//       res.render("account", { signup: result, email: "new@email.com" });
//     })
//     .catch(err => {
//       console.log(err);
//   })
// })

// app.get("/orders", (req, res) => {
//   Order.find()
//     .then((result) => {
//     res.render("index", {title: "Orders", orders: result})
//     })
//     .catch((err) => {
//     console.log(err)
//   })
// });

/* app.get("/orders/create", (req, res) => {
  res.render("orders", { title: "New order" });
});

app.get("/fooditem/:id", (req, res) => {
  console.log(req.params);

  res.render("fooditem");
}); */

app.use((req, res, next) => {
  res.locals.current_user = req.user;

  next();
});

app.use(userRouter);
app.use(contactRouter);
app.use("/food-item",fooditemRouter);

/* app.use((req, res) => {
  res.status(404).send("<h1>404 page</h1>")
}); */


const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, "0.0.0.0",() => {
      console.log(`Server is running port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
