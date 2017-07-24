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

    getMyBookings(req, res) {
        return res.render('auth/bookings');
    }

    getReviewForm(req, res) {
        return res.render('auth/review');
    }

    getAddCarForm(req, res) {
        return res.render('auth/admin/addcar');
    }

    getEditCarForm(req, res) {
        return res.render('auth/admin/editcar');
    }

    getViewBookings(req, res) {
        return res.render('auth/admin/viewbookings');
    }

    getViewCars(req, res) {
        return res.render('auth/admin/viewcars');
    }

    getViewUsers(req, res) {
        return res.render('auth/admin/viewusers');
    }

    getViewDeals(req, res) {
        return res.render('auth/admin/viewdeals');
    }

    logOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    updateProfile(req, res, next) {
        const bodyUser = req.body;
        const convertedUser = this._convertStrings(bodyUser);
        this.data.users.findByUsername(convertedUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    convertedUser._id = dbUser._id;
                    convertedUser.username = dbUser.username;

                    if (convertedUser.password === '' ||
                        typeof convertedUser.password === 'undefined') {
                        delete convertedUser.password;
                        delete convertedUser['repeat-password'];
                        convertedUser.passHash = dbUser.passHash;
                        Promise.resolve(convertedUser);
                    } else {
                        if (convertedUser.password !== convertedUser['repeat-password']) {
                            throw new Error(`Passwords do not!`);
                        }

                        return this._generateHash(convertedUser);
                    }
                }
                throw new Error(`User ${bodyUser.username} not found!`);
            })
            .then((updatedUser) => {
                return this.data.users.updateById(updatedUser);
            })
            .then((dbUser) => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.redirect('/auth/profile');
            });
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
                    delete bodyUser.password;
                    if (bodyUser['repeat-password']) {
                        delete bodyUser['repeat-password'];
                    }
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
