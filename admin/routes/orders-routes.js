const router = require("express").Router();
const Orders = require("../models/orders");
const { getOrders } = require("../clients/orders-client");
const util = require("util");

router.get("/orders", async(req, res) => {
    const response = await getOrders(req, res);

    // const newData = await util.inspect(response, {
    //     showHidden: false,
    //     depth: null,
    //     colors: true
    // });


    console.log(JSON.parse(response))
        // newData.forEach(element => {
        //     console.log(element)
        // });

    res.render("orders", { orders: JSON.parse(response) });
});

module.exports = router;