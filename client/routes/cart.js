const express = require("express");
const router = express.Router();

const Cart = require("../models/cart")

const emailControl = require("../controllers/email");
const foodItem = require("../models/food-item");

router.get("/", async (req, res) => {
    res.render("cart", { title: "Cart" })
});
  
router.post("/add/:food-item", async (req, res) => {
  const item = req.params.foodItem;

  foodItem.findOne({ item }, function (err, i) {
    const { body, file } = req.body;

    const fileName = `${process.cwd()}/assets/img/food-items/${body.name}.png`;
    if (file != null) {
      let buffer = Buffer.from(file.fileupload.data, "base64");
  
      fs.writeFile(fileName, buffer, (err) => {
        if (err) throw err;
        console.log("Image successfully added to cart.");
      });
    }
    
    if (err)
      console.log(err);
    if (typeof req.session.cart == "undefined") {
      req.session.cart = [];
      req.session.cart.push({
        name: item,
        price: parseFloat(i.price).toFixed(2),
        img: fileName.substring(fileName.indexOf("img") - 1, fileName.length),
        category: {
          type: String,
          enum: ["rice", "meats", "home-delights", "drinks"],
        }
      })
    } else {
      const cart = req.session.cart;
      const newItem = true;

      for (const i = 0; i < cart.length; i++) {
        if (cart[i].name == item) {
          cart[i].qty++;
          newItem = false;
          break;
        }
      }

      if (newItem) {
        cart.push({
          name: item,
        price: parseFloat(i.price).toFixed(2),
        img: fileName.substring(fileName.indexOf("img") - 1, fileName.length),
        category: {
          type: String,
          enum: ["rice", "meats", "home-delights", "drinks"],
        }
        })
      }
    }
    console.log(req.session.cart);
    res.redirect("back");
  })
});

// router.get("/find/:id", async (req, res) => {
//     const foodItem = await findById(req, res);
  
//     const relatedFood = await findByCategory(foodItem.category);
  
//     console.log(relatedFood);
  
//     res.render("food-item", { title: "Food Item", foodItem, relatedFood });
// });



router.post("/checkout/:id"), async (req, res) => {

  emailControl.main("capstonetest771@gmail.com", "Test1", "message")
}




module.exports = router;