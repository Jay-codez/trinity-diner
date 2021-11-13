const router = require("express").Router();
const {findAll,findOne,create,findByCategory} = require("../controllers/food-item")


router.get("/", async (req, res) => {

    const data = await findAll(req,res);

    res.render("food-item", { title: "Item View" ,foodItems:data});
});



router.get("/:category", async (req, res) => {

    const data = await findByCategory(req,res);

    res.render("menu", { title: "Menu" ,foodItems:data});
});

router.get("/food-item", async (req, res) => {
    
    res.render("food-item", { title: "Food Item View" });
});






// Admin Routes

router.get("/api/status", async (req, res) => {

    res.status(201).json({ message: "Food Item API is Running...." });
    
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('add-items', { items: items });
        }
    });
});

router.post("/api/new", async (req, res) => {


    const data = await create(req, res);

    res.status(201).json("");
});


module.exports = router;