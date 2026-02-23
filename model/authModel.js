const mongoose = require("mongoose")
const userschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
       default:"user",
        required:true
    }
},{timestamp:true})


const model = mongoose.model("User",userschema)
module.exports = model 