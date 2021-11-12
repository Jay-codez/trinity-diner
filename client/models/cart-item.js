const mongoose = require("mongoose")
const FoodItem = require("./food-item")

const cartItemSchema = new mongoose.Schema({
    foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem"  // Create a relationship b/n foodItem and CartItem because a CartItem has FoodItem
    },
    quantity: {
        type: Number,
        _default: 1,
    }
});

module.exports = mongoose.model("CartItem",cartItemSchema)