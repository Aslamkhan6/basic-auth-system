const Order = require("../model/order");

const myorder = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user.id })
      .populate("orderItems.product", "name price image")
      .sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    res.status(200).json({
      message: "order fetched sucessfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
    });
  }
};

module.exports = myorder;
