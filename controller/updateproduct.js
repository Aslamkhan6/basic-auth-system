const Product = require("../model/productmodel")
const cloudinary = require("../config/cloudinaryconfig")
const updateproduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {
            res.status(404).json({
                message: "product not found"
            })
        }

        product.name = req.body.name || product.name
        product.description = req.body.description || product.description
        product.price = req.body.price || product.price
        product.category = req.body.category || product.category
        product.stock = req.body.stock || product.stock


        if (req.file) {
            if (Product.imagePublicId) {
                await cloudinary.uploader.destroy(Product.imagePublicId)
            }
            //upload new image 
            const result = await new Promise((reject, resolve) => {
                const result = cloudinary.uploader.upload({
                    folder: "products"
                },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                )

                stream.end(req.file.buffer)

            })

            product.image = result.secure_url;
            product.imagePublicId = result.public_id;

        }

        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "server error "
        })
    }
}

module.exports = updateproduct