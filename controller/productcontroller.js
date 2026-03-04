const Product = require("../model/productmodel");
const cloudinary = require("../config/cloudinaryconfig");

const createproduct = async (req, res) => {
  try {
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
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

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const data = await Product.create({
      ...req.body,
      image: imageUrl,
      imagePublicId,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "product created sucessfully ",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "internal server error",
    });
  }
};

module.exports = createproduct;
