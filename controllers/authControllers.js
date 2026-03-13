const User = require('../models/user')
const bcrypt = require("bcryptjs")


const login = async (req, res) => {
    try {
        const { emailOrUname } = req.body
        console.log(emailOrUname)
        const user = await User.findOne({ email: emailOrUname } || { userName: emailOrUname });
        const inputPass=req.body.password
        console.log("input pass", inputPass)

        const compare = await bcrypt.compare(inputPass,user.password);
        console.log(compare)
    
        console.log(user)

        if (!user) {
            return res.status(404).json({ error: "Email or UserName Not Valid" })
        }
        else if (!compare) {
            return res.status(401).json({ success: false, message: "invalid user Password" })
        }

        res.status(200);
        res.json({status:"Success", name:user.userName, session:""})
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