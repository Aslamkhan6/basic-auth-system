const Cart = require("../model/cartmodel");
const Order = require("../model/order");
const Product = require("../model/productmodel");

const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.city ||
      !shippingAddress.addressLine
    ) {
      return res.status(400).json({
        message: "Complete shipping address is required",
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      const quantity = Number(item.quantity) || 0;

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (quantity < 1 || product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      product.stock -= quantity;
      await product.save();

      totalAmount += Number(product.price) * quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      totalAmount,
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = createOrder;
