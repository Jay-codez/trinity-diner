const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem"  // Create a relationship b/n Cart and CartItem because a Cart has multiple CartItems
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" /*  User relationship because we have to map each user to their own cart items in the database
                    so that when they login we can pull their items in the cart this items wi*/
    }
});

module.exports = mongoose.model("Cart",cartSchema)