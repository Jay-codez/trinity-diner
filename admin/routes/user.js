const router = require("express").Router();
const { createAccount ,signIn} = require("../controllers/user");

router.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    
    const results = await signIn(body);
    //console.log(results);

    if(results){
        req.session.current_user = results;
        res.render("index", {title: "Welcome"})
    }else{
        res.redirect("/signin")
    }
});

router.get("/signout", (req, res) => {
    req.session.current_user = undefined
    res.redirect("/");
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
