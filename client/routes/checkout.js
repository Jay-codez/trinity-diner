const router = require("express").Router();
const { saveOrder } = require("../controllers/orders");
const Cart = require("../controllers/cart")

router.get("/checkout", async(req, res) => {
    //create order
    const body = {
        currentUser: req.session.current_user,
        cart: req.session.cart,
    };

    const results = await saveOrder(body);

    if (results) {

        const temp = {
            items: {},
            totalItems: 0,
            totalPrice: 0,
        }


        let cart = new Cart(temp);
        req.session.cart = cart;
        req.session.cartLength = 0;


        res.render("checkout", { title: "Check Out" });
    } else {
        res.redirect("/cart")
    }
});

module.exports = router;