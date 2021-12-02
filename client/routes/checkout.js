const router = require("express").Router();
const { saveOrder } = require("../controllers/orders");
const Cart = require("../controllers/cart")

const { sendMail } = require("../controllers/email");

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

        await sendMail(req.session.current_user.username, req.session.current_user.firstname);

        let cart = new Cart(temp);
        req.session.cart = cart;
        req.session.cartLength = 0;


        res.render("checkout", { title: "Check Out", orders: results });
    } else {
        res.redirect("/cart")
    }
});

module.exports = router;