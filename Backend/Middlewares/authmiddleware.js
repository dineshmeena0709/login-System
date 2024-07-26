
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.sendStatus(401); // Unauthorized
        }

        req.user = user; // Set the authenticated user object in req.user
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.sendStatus(403); // Forbidden
    }
};

module.exports = authenticateToken;
