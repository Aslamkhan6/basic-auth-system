const Banner = require("../model/bannermodel");

const getActiveBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json({ banner });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = getActiveBanner;
