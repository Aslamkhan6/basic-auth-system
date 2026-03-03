const mongoose = require("mongoose");
const Cart = require("../model/cartmodel");
const Order = require("../model/order");
const Product = require("../model/productmodel");

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    const cart = await Cart.findOne({ user: req.user.id }).session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      product.stock -= item.quantity;
      await product.save({ session });

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create(
      [
        {
          user: req.user.id,
          orderItems,
          shippingAddress,
          totalAmount,
        },
      ],
      { session }
    );

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Order created successfully",
      order: order[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = createOrder;