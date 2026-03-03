const Cart = require("../model/cartmodel")
const removefromcart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
        if (!cart) {
            return res.status(404).json({
                messgae: "product not found"
            })
        }
        cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId)

        await cart.save()
        res.status(200).json({
            message: "item removed",
            cart
        })
 

    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}

module.exports = removefromcart