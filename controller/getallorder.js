const Order = require("../model/order");

const allorder = async (req, res) => {
  try {
    const order = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "order fetched successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = allorder;
