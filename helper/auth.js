const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

const authorizeToken = async (req, res, next) => {

    const token = req.headers["authorization"]; 

    if (!token) {
        return res.status(400).json({ responseMessage: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, 'Pizza_system');
        const userResult = await User.findById({ _id: decoded.userId });

        if (!userResult) {
            return res.status(404).json({ responseMessage: 'User Not Found' });
        } else {
            req.userId = userResult._id;
            return next();
        }
    } 
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'Unauthorized - Token has expired' });
        }
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
        console.error('Error authorizing token:', error);
    }
};

module.exports = authorizeToken;
