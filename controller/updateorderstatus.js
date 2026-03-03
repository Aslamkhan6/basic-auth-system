const updateorderstatus = async(req,res)=>{
    try {
        const {status} = req.body
        const order = await ordermodel.findById(req.params.id)
        if(!order){
            return res.status(404).json({
                message:"order not found"
            })
        }   
        order.status = status
        await order.save()
        return res.status(200).json({
            message:"order status updated successfully",
            order
        })

        
    } catch (error) {
        return res.status(500).json({
            message:"server error"
        })
    }
}
module.exports = updateorderstatus