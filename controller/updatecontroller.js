const Product = require("../model/productmodel");
const cloudinary = require("../config/cloudinaryconfig");

const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    // If new image uploaded
    if (req.file) {

      // delete old image
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // upload new image
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) throw error;

          product.image = result.secure_url;
          product.imagePublicId = result.public_id;

          await product.save();

          return res.status(200).json({
            message: "Product updated successfully",
            product,
          });
        }
      );

      result.end(req.file.buffer);

    } else {
      await product.save();

      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = updateproduct;