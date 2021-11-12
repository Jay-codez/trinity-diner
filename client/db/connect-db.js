const mongoose = require("mongoose");

const db_uri = "mongodb://localhost:27017/RestaurantDb"

const connectDB = () =>{
    return  mongoose.connect(db_uri,{
          useNewUrlParser:true,
          useUnifiedTopology:true
      })
  }
    
  module.exports = connectDB;