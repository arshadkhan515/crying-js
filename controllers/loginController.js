const User = require("../models/user");
const jwt = require("jsonwebtoken");

const loginController = {
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email, password: req.body.password });

            if (!user) {
                // user not found
                return res.status(404).json({ message: "User not found" });
            }

            const token = jwt.sign({ id: user._id, userName: user.name }, 'secretkey', { expiresIn: '6000s' });
            res.json({ token, message: "Success" });
        } catch (err) {
            res.status(500).json({ message: err._message });
        }
    }
}

module.exports = loginController;