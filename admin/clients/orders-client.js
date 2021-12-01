const axios = require("axios");

const baseUrl = "http://localhost:3000/orders";

const getOrders = async(req, res) => {

    const results = await axios.get(`${baseUrl}/api/getOrders`);

    return results.data;
};

module.exports = {
    getOrders,
};