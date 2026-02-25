const  Product = require("../model/productmodel")
const cloudinary = require("../config/cloudinaryconfig")
const deleteproduct = async(req,res)=>{
const product = await  Product.findById(req.params.id)
if(!product){
    res.status(404).json({
        message:"product not found"
    })
}

if(Product.imagePublicId){
    await  cloudinary.uploader.destroy(Product.imagePublicId)
}
await Product.deleteOne()

    res.status(200).json({
      message: "Product deleted successfully"
    });

}

module.exports = deleteproduct