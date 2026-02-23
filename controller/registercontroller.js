const user = require("../model/authModel")
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken")

 const register = async(req,res)=>{
    try {
        const { name ,email,password} = req.body
      

        const exuser = await user.findOne({email})
        if(exuser){

             return res.status(400).send("user all ready exist ! try another email ")

        }
        
        const hashpass = await  bcrypt.hash(password,10)
        const createuser = await user.create({
            name,
            email,
            password:hashpass
        })

        res.status(201).json({messsage:"user created sucessfully"})

    } catch (error) {
        res.status(400).json({message:"server error"})
    }

 }

 module.exports = register