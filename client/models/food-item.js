const mongoose = require("mongoose")

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  img: {
    type: String
  },
  featured:{
    type:  Boolean,
    default:false
  },
  category: {
    type: String,
    enum : ["rice","meats","home-delights","drinks"],
  
  },
  //image_urls: [String],
  
});

module.exports = mongoose.model("FoodItem",foodItemSchema)