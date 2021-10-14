const express = require("express");
const bodyParser = require("body-parser")
const path = require("path")
const connectDb = require("./db/connect-db")
const app = express();


const contactRouter = require("./routes/contact")
const PORT = 3000;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended:true
  })
)
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


app.get("/fooditem/:id", (req, res) => {
  

  console.log(req.params)
  
  res.render("fooditem");


});

app.use(contactRouter)



const start = async ()=>{
    try {
      await connectDb()
      app.listen(PORT, () => {
        console.log(`Server is running port ${PORT}`);
      });
      
    } catch (error) {
      console.log(error);
    }
}


start()
