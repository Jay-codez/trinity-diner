const CartItem = require("../models/cart-item");
const mongoose = require("mongoose");

const cartContent = async (body) => {
  if (body) {
    const cartItem = await CartItem.create();

    return cartItem;
  }
};

const findAll = async (req, res) => {
  return await FoodItem.find({});
};

const findById = async (req, res) => {
  return await FoodItem.findById(req.params.id);
};

const findByCategory = async (category) => {
  return await FoodItem.find({ category });
};

module.exports = {
  cartContent,
  findById,
  findAll,
  findByCategory,
};
