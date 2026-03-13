const User = require('../models/user');
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken')


const login = async (req, res) => {
    let user = null;
    try {
        const { emailOrUname } = req.body;
        const inputPass = req.body.password;

        console.log("Email or uname : ", emailOrUname)
        console.log("password", req.body.password)

        // Checking if user enters Email or Username
        if (emailOrUname.includes('@')) {
            user = await User.findOne({ email: emailOrUname });
        }
        else {
            user = await User.findOne({ userName: emailOrUname });
        }

        const compare = await bcrypt.compare(inputPass, user.password);

        if (!user) {
            return res.status(404).json({ error: "Email or UserName Not Valid" })
        }
        else if (!compare) {
            return res.status(401).json({ success: false, message: "invalid user Password" })
        }

        const token = generateToken(user._id);

        // Send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true in production
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24
        });

        res.status(200).json({
            status: "Success",
            id: user._id,
            name: user.userName,
            email: user.email,
        })

        console.log(user)

    }
    catch (error) {
        console.log(error)
    }


}

const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        })
        res.status(200)
        res.json({ created: "New User", userDetails: req.body })

    }
    catch (error) {
        console.log(error)
        res.status(400)
        res.json(error.message)

    }

}

module.exports = { login, signup }