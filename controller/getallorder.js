const allorder = async(req,res)=>{
    try {
        const order = await ordermodel.find().populate("user","name,email").populate("orderitems.product","name price image").sort({createdAt:-1})

        return res.status(200).json({
            message:"order fetched successfully",
            order
        })
    } catch (error) {
        return res.status(500).json({
            message:"server error"
        })
    }
}

module.exports = allorder