const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'];
    console.log(token);
    if (token) {
        jwt.verify(token, 'superSecret', (err, decoded) => {
            if (err) {
                console.log('error is in jwt');
                res.status(401).redirect('/401');
            } else {
                req.decoded = decoded;
            }

            return next();
        });
    } else {
        console.log('error is in simewhere else');
        res.status(401).redirect('/401');
    }

    return next();
};

module.exports = verifyToken;
