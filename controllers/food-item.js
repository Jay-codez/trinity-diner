const FoodItem = require('../models/food-item')
const mongoose = require("mongoose") 


const findOne = (req,res) => {

}

const create = async (req,res) => {
  return await FoodItem.create(req.body)
}

const findAll = async (req,res) =>{
 return await FoodItem.find()
}


const findByCategory = async (req,res) =>{
    return await FoodItem.find({category:req.params.category})
   }


module.exports = {
    findOne,
    findAll,
    create,
    findByCategory
}