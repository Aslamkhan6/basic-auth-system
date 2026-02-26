const Cart  = require("../model/cartmodel")
const getcart = async  (req,res)=>{
    try {
        
        const cart = await Cart.findOne({user:req.user.id}).populate("items.product")

        console.log(cart)
        if(!cart){
             return res.status(200).json({items : []})
        }
        res.status(200).json(cart)
    
    } catch (error) {
     res.status(500).json({
            message:"server error"
        })
    }
}

module.exports = getcart