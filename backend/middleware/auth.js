const jwt = require('jsonwebtoken');
const authSecret = require('../config/auth-secret');

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Token not present' });
    }

    try {
        const result = jwt.verify(token, authSecret);
        req.user = result.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token not valid' });
    }
};
