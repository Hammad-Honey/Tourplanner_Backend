const User = require('../models/user');
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken')


const login = async (req, res) => {
    try {
        const { emailOrUname, password } = req.body;
        let compared;
        // Checking if user enters Email or Username
        const user = emailOrUname.includes('@') ?
            await User.findOne({ email: emailOrUname }) :
            await User.findOne({ userName: emailOrUname });

        //Comparing Bycrypt
        if(user){compared = await bcrypt.compare(password, user.password)}

        if (!user || !compared) {
            res.status(401).json({
                success: false,
                message: "Invalid Email/Username or password"
            })

        } else {
            const token = generateToken(user._id);
            // Send token in cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // change to true in production
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24
            });

            res.status(200).json({
                success: true,
                message: "Login Successfull",
                user: {
                    id: user._id,
                    name: user.userName,
                    email: user.email,
                    role: user.role,
                },
            }); console.log("Login api", user)

        }



    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failed",
            error: { error }
        })
    }

}

const signup = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email/Username Already Exists"
            })
        }

        await User.create({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: hashedPassword,
        })
        res.status(200).json({
            success: true,
            message: "new User Created Successfully",
            user: {
                name: (req.body.firstName + " " + req.body.lastName),
                email: req.body.email,
            }
        })

    }
    catch (error) {
        console.log("Signup API error", error)
        res.status(500).json({
            success: false,
            message: "Signup Failed",
            error: error
        })

    }

}

module.exports = { login, signup }