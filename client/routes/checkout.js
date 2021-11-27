const router = require("express").Router();


router.get("/checkout", (req, res) => {

    res.render("checkout", { title: "Check Out" })
})


module.exports = router;