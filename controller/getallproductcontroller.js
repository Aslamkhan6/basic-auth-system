const Product = require("../model/productmodel");

const getallproduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const category = req.query.category;

    let filter = {};

    // Search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Sorting
    let sortoption = {};

    if (req.query.sort === "asc") {
      sortoption.price = 1;
    } else if (req.query.sort === "desc") {
      sortoption.price = -1;
    }

    const totalproduct = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortoption)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email");

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalproduct / limit),
      totalproduct,
      products,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getallproduct;