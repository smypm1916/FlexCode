const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");

router.post("/order", orderController.order);

module.exports = router;
