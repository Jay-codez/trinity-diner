const router = require("express").Router();
const {addFoodIem} = require("../clients/food-item-client")


router.get("/add-food-item", (req, res) => {
    res.render("add-items"); 
  });
    

router.post("/add-food-item", async (req, res) => {

    const data = await addFoodIem(req,res);

    if(data){
      res.redirect("/add-food-item")
    }else{
      res.redirect("/add-food-item")
    }

});



module.exports = router;