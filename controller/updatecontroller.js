const User = require("../model/authModel")
const cloudinary = require("../config/cloudinaryconfig")
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                message: "user not found "
            })
        }
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email


        if (req.file) {
            if (user.profileImagePublicId) {
                await cloudinary.uploader.destroy(user.profileImagePublicId);
            }
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "users" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            user.profileImage = result.secure_url;
            user.profileImagePublicId = result.public_id;

        }

        await user.save()


    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });


    } catch (error) {
          console.log(error)
 res.status(500).json({
  
    message:"internal server error"
 })
    }
}


module.exports = updateProfile