const bcrypt = require('bcrypt');

const generateHash = (bodyUser) => {
    return bcrypt.hash(bodyUser.password, 10)
        .then((hash) => {
            bodyUser.passHash = hash;
            delete bodyUser.password;

            if (bodyUser['repeat-password']) {
                delete bodyUser['repeat-password'];
            }

            return Promise.resolve(bodyUser);
        });
};

module.exports = generateHash;