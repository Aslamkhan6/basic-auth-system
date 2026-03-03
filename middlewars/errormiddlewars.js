// const errorhandler = (err,req,res,next)=>{
//     let statuscode =  res.statuscode === 500 ? 200: err.statuscode
//     res.status(statuscode).json({
//         sucess:false,
//         message:err.message || "server error ",
//         stack:process.env.NODE_ENV === "production" ? null : err.stack

//     })
// }
// module.exports = errorhandler