const product = require("../model/productmodel")
const getallproduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const serach = req.query.serach || "";
        const category = req.query.category;

        let filter = {}

        //search by name 
        if (serach) {
            filter.name = { $regex: serach, option: "i" }
        }


        //filter by category 

        if (category) {
            filter.category = category
        }

        //sorting 

        let sortoption = {}
        if (req.query.sort === "asc") {
            sortoption.price = 1
        }
        else if (req.query.sort === "desc") {
            sortoption.price === -1
        }

        const totalproduct = await product.countDocuments(filter)

        const products = await product.find(filter)
            .sort(sortoption)
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "name email")



        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil( totalproduct/ limit),
            totalproduct,
            products
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = getallproduct