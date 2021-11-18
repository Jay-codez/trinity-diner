const Cart = require("../models/cart-item")

const cartContent = async (body) =>{
    const results = await Cart.create(body)

    return results;
}



module.exports = {cartContent}