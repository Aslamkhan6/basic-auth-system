const allowrole = (...roles)=>{
    return (req,res,next)=>{
       console.log(req.user.role)
        if(!roles.includes(req.user.role)){
           return   res.status(401).json({mesaage:"access denaid"})
        }
         return next()
    }
}

module.exports = allowrole