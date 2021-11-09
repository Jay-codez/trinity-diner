const mongoose = require("mongoose")

const foodItemSchema = new mongoose.Schema({
    name: String,
  price: Number,
  description: String,
    featured:{
      type:  Boolean,
      default:false
    },
    category: {
      enum : ["rice","meat","home-delights","drinks"],
    
    },
    image_urls:[String]
});

module.exports = mongoose.model("FoodItem",foodItemSchema)