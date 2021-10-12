const express = require("express");
const path = require("path")
const app = express();

app.use(express.json());



const PORT = 3000;

app.set("view engine","ejs")
app.use("/",express.static(path.join(__dirname,"assets")))

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});


app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/fooditem/:id", (req, res) => {
  

  console.log(req.params)
  
  res.render("fooditem");


});



app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
