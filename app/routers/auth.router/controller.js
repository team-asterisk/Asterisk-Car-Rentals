class CarRentalsController {
    constructor(data) {
        this.data = data;
    }

    getRegisterForm(req, res) {
        return res.render('auth/register');
    }
    getLogInForm(req, res) {
        return res.render('auth/login');
    }
    logOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    register(req, res) {
        const bodyUser = req.body;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }

                return this.data.users.create(bodyUser);
            })
            .then((dbUser) => {
                return res.redirect('/auth/login');
            })
            .catch((err) => {
                req.flash('error', err);
            });
    }
}

const init = (data) => {
    return new CarRentalsController(data);
};

module.exports = { init };
