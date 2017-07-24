const bcrypt = require('bcrypt');
const convert = require('../../../utils/inputConverter').convert;

class AuthController {
    constructor(data) {
        this.data = data;
    }

    getRegisterForm(req, res) {
        return res.render('auth/register');
    }

    getLogInForm(req, res) {
        return res.render('auth/login');
    }

    getProfileForm(req, res) {
        return res.render('auth/profile');
    }

    logOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    register(req, res, next) {
        const bodyUser = req.body;
        const convertedUser = this._convertStrings(bodyUser);
        this.data.users.findByUsername(convertedUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }
                return this._generateHash(convertedUser);
            })
            .then((newUser) => {
                return this.data.users.create(newUser);
            })
            .then((dbUser) => {
                return res.redirect('/auth/login');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.redirect('/auth/register');
            });
    }

    _convertStrings(bodyUser) {
        const converted = {};
        Object.keys(bodyUser)
            .forEach((prop) => {
                converted[prop] = convert(bodyUser[prop]);
            });

        return converted;
    }

    _generateHash(bodyUser) {
        const promise = new Promise((res, rej) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return rej(err);
                }
                return bcrypt.hash(bodyUser.password, salt, (error, hash) => {
                    if (err) {
                        return rej(error);
                    }

                    bodyUser.passHash = hash;
                    return res(bodyUser);
                });
            });
        });
        return promise;
    }
}

const init = (data) => {
    return new AuthController(data);
};

module.exports = { init };
