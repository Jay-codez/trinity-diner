const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
    currentUser: Object,
    cart: {
        type: Object,
    }
});

module.exports = mongoose.model("Orders", ordersSchema)