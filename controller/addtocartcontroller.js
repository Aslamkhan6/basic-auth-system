
const Cart = require("../model/cartmodel")
const Product = require("../model/productmodel")

const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body
        const product = await Product.findById(productId)
        console.log(product)
        if (!product) {
          return    res.status(404).json({
                message: "product not found"
            })
        }
        let cart = await Cart.findOne({ user: req.user.id })
        if (!cart) {
           cart =  await Cart.create({
                user: req.user.id,
                items: []
            })}

            const itemindex = cart.items.findIndex(item => item.product.toString() === productId)

            //if product is already 
            if(itemindex > -1){
                cart.items[itemindex].quantity  += quantity 
            }
            //if product is not added
            else{
                cart.items.push({
                    product:productId,
                    quantity,
                    price:product.price
                })
            }
            await cart.save()
            res.status(201).json({
                message:"product sucessfully added to cart",
                cart
            })
 }
     catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        })
    }
}

module.exports = addToCart