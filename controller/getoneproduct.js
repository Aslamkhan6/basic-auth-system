const Product = require("../model/productmodel")

const getsingleproduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id).populate("createdBy", "name email")
        if (product) {
            return  res.status(200).json({
                message: "product found",
                product
            })

        }

        else {
          return    res.status(404).json({
                message: "no product find of this category"
            })
        }

    } catch (error) {
     return     res.status(500).json({
            message: "server error"
        })
    }
}

module.exports = getsingleproduct