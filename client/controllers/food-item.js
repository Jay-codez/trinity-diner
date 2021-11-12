const FoodItem = require('../models/food-item')
const mongoose = require("mongoose") 
const fs = require("fs")

const findOne = (req,res) => {

}

const create = async (req,res) => {

  const {body,file} = req.body;



  const fileName = `${process.cwd()}/assets/img/food-items/${body.name}.png`;


  if(file != null){
   let buffer = Buffer.from(file.fileupload.data,'base64')

     fs.writeFile(fileName,buffer,(err)=>{
       if(err) throw err;
       console.log("File was created successfully.")
     });
  }

  body.img = fileName


  return await FoodItem.create(body)
}

const findAll = async (req,res) =>{
 return await FoodItem.find({})
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