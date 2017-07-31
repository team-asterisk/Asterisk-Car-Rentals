const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
const csrf = require('csurf');

const csrfProtection = csrf();

const applyTo = (app, data, config) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return Promise.reject(`No user ${username} found!`);
                }
                return user;
            })
            .then((user) => {
                if (bcrypt.compareSync(password, user.passHash)) {
                    return user;
                }
                return Promise.reject('Password is wrong!');
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(null, false, { message: err });
            });
    }));

    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));

    app.use(csrfProtection);

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });

    app.use((req, res, next) => {
        res.locals.csrfTokenFunc = req.csrfToken;

        next();
    });

    app.use((err, req, res, next) => {
        if (err.code !== 'EBADCSRFTOKEN') {
            return next(err);
        }

        // handle CSRF token errors here
        return res.status(403)
            .send('session has expired or form tampered with');
    });
};

module.exports = { applyTo };
