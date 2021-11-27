const express = require("express");
const router = express.Router();

const Cart = require("../controllers/cart")
const FoodItem = require("../models/food-item")
const User = require("../models/user")


const emailControl = require("../controllers/email");


router.get('/', function(req, res, next) {
    var loginUser = req.session.current_user._id

    User.find({ _id: loginUser }).exec(function(err, userdata) {
        if (err) throw err

        if (!req.session.cart) {
            return res.render('cart', { title: 'Cart', loginUserInfo: loginUser, userData: userdata });
        }

        var cart = new Cart(req.session.cart);
        console.log("CART ITEMS" + JSON.stringify(cart.getItems()))
        res.render('cart', { title: 'Cart', foodItems: cart.getItems(), totalPrice: cart.totalPrice, loginUserInfo: loginUser, userData: userdata });
    });
})

router.get('/buy-product/:id', function(req, res, next) {
    var loginUser = req.session.userId

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    FoodItem.findOne({ _id: productId }, function(err, data) {
        cart.add(data, productId);
        req.session.cart = cart;
        res.redirect('/checkout');
    });

});

router.get('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    FoodItem.findOne({ _id: productId }, function(err, data) {
        cart.add(data, productId);
        req.session.cart = cart;
        res.redirect('/cart');
    });

});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.post('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.status(200).json({ "success": true })
});

router.post('/increment/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.addByOne(productId);
    req.session.cart = cart;
    res.status(200).json({ "success": true })
});




module.exports = router;