class AuthController {
    constructor(data) {
        this.data = data;
    }

    getRegisterForm(req, res) {
        return res.render('auth/register', { req: req });
    }

    getLogInForm(req, res) {
        return res.render('auth/login', { req: req });
    }

    getProfileForm(req, res) {
        return res.render('auth/profile', { req: req });
    }

    getMyBookings(req, res) {
        return res.render('auth/bookings', {
            req: req,
            moment: require('moment'),
        });
    }

    getReviewForm(req, res) {
        return res.render('auth/review', { req: req });
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
                req.toastr.error(err.message);
                return res.redirect('/auth/profile');
            });
    }

    register(req, res) {
        const bodyUser = req.body;
        return this._checkIfUserExists(bodyUser)
            .then((user) => {
                return this.data.users.create(user);
            })
            .then((dbUser) => {
                return res.redirect('/auth/login');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.redirect('/auth/register');
            });
    }

    _checkIfUserExists(user) {
        const username = user.username;
        return this.data.users.findByUsername(username)
            .then((dbUser) => {
                console.log('------- test if exists -------');
                console.log(dbUser);
                console.log(user);
                console.log('------- end test if exists -------');

                if (dbUser) {
                    throw new Error('User already exists');
                }

                return Promise.resolve(user);
            });
    }

    _updateUserProperties(user) {
        return this.data.users.findByUsername(user.username)
            .then((dbUser) => {
                if (dbUser) {
                    console.log('------- test update -------');
                    console.log(dbUser);
                    console.log(user);
                    console.log('------- end test update -------');

                    user._id = dbUser._id;
                    user.username = dbUser.username;
                    user.role = dbUser.role;
                    user.bookings = dbUser.bookings;

                    if (user.password === '' ||
                        typeof user.password === 'undefined') {
                        delete user.password;
                        delete user['repeat-password'];
                        user.passHash = dbUser.passHash;
                        return Promise.resolve(user);
                    }

                    if (user.password !== user['repeat-password']) {
                        throw new Error(`Passwords do not match!`);
                    }
                    return Promise.resolve(user);
                }

                if (user.username) {
                    throw new Error(`User ${user.username} not found!`);
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
