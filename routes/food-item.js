const router = require("express").Router();
const {findAll,findOne,create,findByCategory} = require("../controllers/food-item")


router.get("/", async (req, res) => {

    const data = await findAll(req,res);

    res.render("view-item", { title: "Item View" ,foodItems:data});
});

router.get("/:category", async (req, res) => {

    const data = await findByCategory(req,res);

    res.render("menu", { title: "Menu" ,foodItems:data});
});






// Admin Routes

router.get("/api/status", async (req, res) => {

    res.status(201).json({message:"Food Item API is Running...."});
});

router.post("/api/new", async (req, res) => {

    const data = await create(req, res);

    res.status(201).json(data);
});


module.exports = router;