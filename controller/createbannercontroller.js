const Banner = require("../model/bannermodel");
const cloudinary = require("../config/cloudinaryconfig");

const createBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({ message: "Title and subtitle are required" });
    }

    let image = "";
    let imagePublicId = "";

    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "banners" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      image = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
    }

    const activeBanners = await Banner.find({ isActive: true });
    for (const banner of activeBanners) {
      banner.isActive = false;
      await banner.save();
    }

    const banner = await Banner.create({
      title,
      subtitle,
      image,
      imagePublicId,
      isActive: true,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = createBanner;
