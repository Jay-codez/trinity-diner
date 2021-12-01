const { getOrders } = require("../../admin/clients/orders-client");
const Orders = require("../models/orders");

const saveOrder = async(body) => {
    const results = await Orders.create(body);

    return results;
};

const findAll = async(req, res) => {
    return await Orders.find({});
};

module.exports = { saveOrder, findAll };