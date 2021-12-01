const router = require("express").Router();
const { findAll } = require("../controllers/orders");


router.get("/api/getOrders", async(req, res) => {
    const data = await findAll(req, res);

    res.status(200).json(JSON.stringify(data));
});

module.exports = router;