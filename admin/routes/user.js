const router = require("express").Router();
const { createAccount ,signIn} = require("../controllers/user");
const passport = require("passport")

router.get("/signin", (req, res) => {
  res.render("signin");
});



router.post("/signin", 
passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/signin"
}),(req,res)=>{

});



router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req,res)=>{

    const body = req.body;
    
    if(body){
        body.terms === 'on' ? body.terms = true : body.terms = false;
    }

    const results = await createAccount(body);

    if(results){
        res.redirect("/signin")
    }else{
        res.redirect("/signup")
    }

});

module.exports = router;
