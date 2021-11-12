const router = require("express").Router();


router.get("/e-orders", (req, res) => {
    res.render("e-orders"); 
  });
    




module.exports = router;