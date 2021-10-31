const router = require("express").Router();
const {saveContact} = require("../controllers/contact") 

router.get("/contact",(req,res)=>{
   res.render("contact", { title: "Contact Us" })
 }) 
 
 
router.post("/contact",async (req,res)=>{
try {
   const data = req.body;

   const results = await saveContact(data);

   if(results){
      res.redirect("/")
   }else{
      res.redirect("/contact")
   }

} catch (error) {
   console.log(error)
}

 }) 


module.exports = router;







