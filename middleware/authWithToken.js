const jwt = require("jsonwebtoken");


const authWithToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not Authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = authWithToken 