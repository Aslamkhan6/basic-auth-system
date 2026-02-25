const product = require("../model/productmodel")
const cloudinary = require("../config/cloudinaryconfig")

const createproduct = async (req,res)=>{
    try {
        let imgeUrl = "";
        let imgPublicId = "";

        if(req.file){
            const result =  await new Promise((resolve,reject)=>{
                const stream =  cloudinary.uploader.upload_stream({
                    folder:"products"
                },
            (error,result)=>{
              if(error) reject(error)
                else resolve(result)
            }
            )
            stream.end(req.file.buffer)
            })

            imgeUrl = result.secure_url
            imgPublicId= result.Public_Id
        }
        const data = await  product.create(

            {
            ...req.body,
            image:imgeUrl,
             imagePublicId:imgPublicId,
           createdBy:req.user.id
        })

        res.status(201).json({
            message:"product created sucessfully ",
            data
        })


    } catch (error) {

        console.log(error)
        res.status(400).json({
            message:"internal server error"
        })
        
    }
}


module.exports = createproduct