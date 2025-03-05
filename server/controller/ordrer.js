const orderService = require("../services/order");

const order = async (req, res) => {
   try {
      const order = await orderService.order(req.body);
      res.status(200).json(order);
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

module.exports = { order };
