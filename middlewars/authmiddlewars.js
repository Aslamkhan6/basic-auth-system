const jwt =  require("jsonwebtoken")
const authmiddlewars = async(req,res,next)=>{
const header = req.headers.authorization
    if(!header || !header.startsWith("Bearer "))
    {
        return   res.status(400).json({message:"no token is provided "})
    }

   const token =  header.split(" ")[1]
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode
        console.log(decode  )
      return   next()
    } catch (error) {
       return   res.status(400).json({message:"invalid token"})
    }
}

module.exports = authmiddlewars