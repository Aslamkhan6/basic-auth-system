
const Cart = require("../model/cartmodel")
const Product = require("../model/productmodel")

const addToCart = async (req, res) => {
    try {

        const { productId } = req.body
        const quantity = Number(req.body.quantity) || 1;
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
                const nextQty = Number(cart.items[itemindex].quantity) + quantity;
                if (nextQty > product.stock) {
                    return res.status(400).json({ message: "Insufficient stock" });
                }
                cart.items[itemindex].quantity = nextQty;
            }
            //if product is not added
            else{
                if (quantity > product.stock) {
                    return res.status(400).json({ message: "Insufficient stock" });
                }
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
