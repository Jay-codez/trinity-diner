const express = require("express");
const bodyParser = require("body-parser")
const path = require("path")
const connectDb = require("./db/connect-db")

const Signin = require("./models/signin")
const Account = require("./models/account")
const Order = require("./models/order")

const app = express();


const contactRouter = require("./routes/contact");

const { render } = require("ejs");

const PORT = 3000;
const start = async ()=>{
  try {
    await connectDb()
    app.listen(PORT, () => {
      console.log(`Server is running port ${PORT}...`);
    });
    
  } catch (error) {
    console.log(error);
  }
}



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended:true
  })
)
app.set("view engine","ejs")
app.use("/", express.static("assets"))
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

app.get("/menu", (req, res) => {
  res.render("menu", { title: "Menu" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

app.get("/accounts/signup", (req, res) => {
  res.render("signup");
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

app.get("/cart", (req, res) => {
  res.render("cart", { title: "Sign Up" });
});



/* app.get("/signin", (req, res) => {
  const signin = new Signin({
    email: "new@email.com",
    password: "password1"
  });

  signin.save()
});
 */


app.post("/add-account", (req, res) => {
  const account = new Account(req.body);

  account.save()
    .then((result) => {
      res.render("/signin");
    })
    .catch((err) => {
      console.log(err);
    })
});

//const acc_id = req.params.id;

app.get("/find-account", (req, res) => {
  const id = req.params.id;
  Signup.findById(id)
    .then(result => {
      res.render("account", { signup: result, email: "new@email.com" });
    })
    .catch(err => {
      console.log(err);
  })
})

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Signup.findById(id)
    .then(result => {
      res.render("account", { signup: result, email: "new@email.com" });
    })
    .catch(err => {
      console.log(err);
  })
})


app.get("/orders", (req, res) => {
  Order.find()
    .then((result) => {
    res.render("index", {title: "Orders", orders: result})
    })
    .catch((err) => {
    console.log(err)
  })
});

app.get("/orders/create", (req, res) => {
  res.render("orders", {title: "New order"});
});



app.get("/fooditem/:id", (req, res) => {
  

  console.log(req.params)
  
  res.render("fooditem");


});

app.use(contactRouter)




start()