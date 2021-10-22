const router = require("express").Router();
const { createAccount ,signIn} = require("../controllers/user");
const passport = require("passport")

router.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

// router.post("/signin", async (req, res) => {
//     const body = req.body;
    
//     const results = await signIn(body);
//     console.log(results)

//     if(results.user === true){
//         res.render("index",{current_user : results,title: "Sign In"})
//     }else{
//         res.redirect("/signin")
//     }
// });


router.post("/signin", 
passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/signin"
}),(req,res)=>{

});



router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
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
