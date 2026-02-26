const mongoose = require("mongoose")
const cartItemSchema= new mongoose.Schema({
product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
},
quantity:{
    type:String,
    required:true,
    default:1
},
price:{
    type:Number,
    required:true,

}
});
const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[cartItemSchema]
},{timestamps : true})

const cartmodel = mongoose.model("Cart",cartSchema)
module.exports = cartmodel