const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    }
});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
