const allowrole = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
           return   res.status(401).json({mesaage:"access denaid"})
        }
         return next()
    }
}

module.exports = allowrole