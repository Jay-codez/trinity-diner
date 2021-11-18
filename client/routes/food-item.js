const router = require("express").Router();
const { name } = require("ejs");
const {
  findAll,
  findById,
  create,
  findByCategory,
} = require("../controllers/food-item");
const { findByIdAndRemove } = require("../models/food-item");
const resizeImg = require("resize-img")
const Fooditem = require("../models/food-item")


router.get("/", async (req, res) => {
  const data = await findAll(req, res);
    const relatedFood = await findByCategory(foodItem.category);
    
  res.render("food-item", { title: "Item View", foodItems: data });
});

// router.get("/", async (req, res) => {
//   const count;

//   Fooditem.count(function (err, c) {
//     count = c;
//   })



// });


router.get("/:category", async (req, res) => {
  const category = req.params.category;
  const data = await findByCategory(category);

  res.render("menu", { title: "Menu", foodItems: data });
});

router.get("/find/:id", async (req, res) => {
  const foodItem = await findById(req, res);

  const relatedFood = await findByCategory(foodItem.category);


  res.render("food-item", { title: "Food Item", foodItem, relatedFood });
});


// Admin Routes

router.get("/api/status", async (req, res) => {
  res.status(201).json({ message: "Food Item API is Running...." });

  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("add-items", { items: items });
    }
  });
});

router.get("/api/category/:category", async (req, res) => {
  const category = req.params.category;
  const data = await findByCategory(category);

  res.status(200).json(data);
});

// router.get("/api/remove-name/:name", async (req, res) => {
//   const data = await findByIdAndRemove(name);

//   res.status(201).json("");
// })

router.post("/api/new", async (req, res) => {
  const data = await create(req, res);

  res.status(201).json("");
});

module.exports = router;
