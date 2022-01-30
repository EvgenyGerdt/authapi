const jwt = require("jsonwebtoken");
const config = require('../config/baseConfig');

verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return next(res.status(403).send({ message: 'Token provided' }));
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            return next(res.status(401).send({ message: 'Unauthorized' }));
        }

        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken,
};

module.exports = authJwt;