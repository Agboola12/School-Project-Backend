const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {
    jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET,
        (err, data) => {
            if (err) {
                res.status(200).json({
                    status: false,
                    message: "Invalid token"
                })
            } else {
                req.user = data;
                next();
            }

        })
}

module.exports = { verifyUser }


