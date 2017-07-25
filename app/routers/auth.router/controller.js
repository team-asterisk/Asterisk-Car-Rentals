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

    updateProfile(req, res) {
        const bodyUser = req.body;
        return this._updateUserProperties(bodyUser)
            .then((user) => {
                return this.data.users.updateById(user);
            })
            .then((dbUser) => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.redirect('/auth/profile');
            });
    }

    register(req, res) {
        const bodyUser = req.body;
        return this._checkIfUserExists(bodyUser)
            .then(() => {
                return this.data.users.create(bodyUser);
            })
            .then((dbUser) => {
                return res.redirect('/auth/login');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.redirect('/auth/register');
            });
    }

    _checkIfUserExists(user) {
        return this.data.users.findByUsername(user._username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }

                return Promise.resolve(true);
            });
    }

    _updateUserProperties(user) {
        return this.data.users.findByUsername(user._username)
            .then((dbUser) => {
                if (dbUser) {
                    user._id = dbUser._id;
                    user._username = dbUser._username;

                    if (user._password === '' ||
                        typeof user._password === 'undefined') {
                        delete user._password;
                        delete user['repeat-password'];
                        user.passHash = dbUser.passHash;
                        return Promise.resolve(user);
                    }

                    if (user._password !== user['repeat-password']) {
                        throw new Error(`Passwords do not match!`);
                    }
                    return Promise.resolve(user);
                }

                if (user._username) {
                    throw new Error(`User ${user._username} not found!`);
                } else {
                    throw new Error(`No username provided!`);
                }
            });
    }
}

const init = (data) => {
    return new AuthController(data);
};

module.exports = { init };
