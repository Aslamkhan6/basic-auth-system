const User = require("../model/authModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinaryconfig");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";
    let publicId = "";

    if (req.file) {
      // Convert upload_stream to Promise
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "users" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
      };

      const result = await uploadToCloudinary();
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImage: imageUrl,
      profileImagePublicId : publicId
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = register;