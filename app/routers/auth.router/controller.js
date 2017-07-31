class AuthController {
    constructor(data, io) {
        this.data = data;
        this.io = io;
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
        this.io.emit('user logged out', { text: 'user logged out' });
        return res.status(200).redirect('/');
    }

    updateProfile(req, res) {
        const bodyUser = req.body;
        const reqUser = req.user;
        return this._updateUserProperties(reqUser, bodyUser)
            .then((user) => {
                return this.data.users.updateUser(user);
            })
            .then((dbUser) => {
                return res.status(200).redirect('/');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.status(400).redirect('/auth/profile');
            });
    }

    register(req, res) {
        const bodyUser = req.body;
        return this._checkIfUserExists(bodyUser)
            .then((user) => {
                return this.data.users.create(user);
            })
            .then((dbUser) => {
                return res.status(200).redirect('/auth/login');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.status(400).redirect('/auth/register');
            });
    }

    _checkIfUserExists(user) {
        const username = user.username;
        return this.data.users.findByUsername(username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }

                return Promise.resolve(user);
            });
    }

    _updateUserProperties(user, bodyUser) {
        return this.data.users.findByUsername(user.username)
            .then((dbUser) => {
                if (dbUser) {
                    bodyUser._id = dbUser._id;
                    bodyUser.username = dbUser.username;
                    bodyUser.role = dbUser.role;
                    bodyUser.bookings = dbUser.bookings;

                    if (bodyUser.password === '' ||
                        typeof bodyUser.password === 'undefined') {
                        delete bodyUser.password;
                        delete bodyUser['repeat-password'];
                        bodyUser.passHash = dbUser.passHash;
                        return Promise.resolve(bodyUser);
                    }

                    if (bodyUser.password !== bodyUser['repeat-password']) {
                        throw new Error(`Passwords do not match!`);
                    }

                    return Promise.resolve(bodyUser);
                }

                if (user.username) {
                    throw new Error(`User ${user.username} not found!`);
                } else {
                    throw new Error(`No username provided!`);
                }
            });
    }

    // Access control
    verifyIsUser(req, res, next) {
        if (!req.user) {
            req.toastr.error('You need to be logged in to access this page.');
            res.status(401).redirect('/auth/login');
        }
        // console.log(req.user);

        return next();
    }

    verifyIsAdmin(req, res, next) {
        if (!req.user || req.user.role !== 'admin') {
            req.toastr.error('You need to be an Admin to access this page.');
            res.status(401).redirect('/401');
        }
        // console.log(req.user);
        return next();
    }
}

const init = (data, io) => {
    return new AuthController(data, io);
};

module.exports = { init };
