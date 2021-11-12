const router = require("express").Router();


router.get("/orders", (req, res) => {
    res.render("orders"); 
  });
    




module.exports = router;