

const profilecontroller = async (req, res) => {
    return res.json({
        message: "Protected route access",
        user: req.user
    });
};

module.exports = profilecontroller;