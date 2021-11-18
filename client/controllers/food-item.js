const FoodItem = require("../models/food-item");
const mongoose = require("mongoose");
const fs = require("fs");

const create = async (req, res) => {
  const { body, file } = req.body;

  const fileName = `${process.cwd()}/assets/img/food-items/${body.name}.png`;

  if (file != null) {
    let buffer = Buffer.from(file.fileupload.data, "base64");

    fs.writeFile(fileName, buffer, (err) => {
      if (err) throw err;
      console.log("File was created successfully.");
    });
  }

  body.img = fileName.substring(fileName.indexOf("img") - 1, fileName.length);

  return await FoodItem.create(body);
};

const findAll = async (req, res) => {
  return await FoodItem.find({});
};

const findById = async (req, res) => {
  return await FoodItem.findById(req.params.id);
};

const findByCategory = async (category) => {
  return await FoodItem.find({ category});
};

module.exports = {
  findById,
  findAll,
  create,
  findByCategory,
};
