const Product = require("../model/productmodel");
const cloudinary = require("../config/cloudinaryconfig");

const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    if (req.file) {
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, uploaded) => {
            if (error) reject(error);
            else resolve(uploaded);
          }
        );
        stream.end(req.file.buffer);
      });

      product.image = result.secure_url;
      product.imagePublicId = result.public_id;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error ",
    });
  }
};

module.exports = updateproduct;
