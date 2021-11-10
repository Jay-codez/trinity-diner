const mongoose = require("mongoose")

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  img: {
    data: Buffer,
    contentType: String
  },
  featured:{
    type:  Boolean,
    default:false
  },
  category: {
    enum : ["rice","meats","home-delights","drinks"],
  },
  //image_urls: [String],
  
});

module.exports = mongoose.model("FoodItem",foodItemSchema)