const router = require("express").Router();

router.get("/add-product", (req, res) => {
    res.send("/admin/products", { title: "Add Product" });
});
  
router.post("/products", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;