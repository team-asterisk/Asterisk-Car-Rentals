const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'superSecret', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.',
                });
            }
            req.decoded = decoded;
            return next();
        });
    } else {
        res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.',
        });
    }
};

module.exports = verifyToken;
