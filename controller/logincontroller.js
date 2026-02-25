const User = require("../model/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "User not found or invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: existingUser._id,
       role:existingUser.role
       },

      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    
    return res.status(500).json({
      message: "Server error"
    });
    console.log(error)
  }
};

module.exports = login;