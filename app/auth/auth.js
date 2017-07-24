const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');

const config = require('../../config');

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error(`No user ${username} found!`);
                } else {
                    return user;
                }
            })
            .then((user) => {
                // async hash compare not working well here
                // return new Promise((res, rej) => {
                //     bcrypt.compare(password, user.passHash, (err, ready) => {
                //         if (ready) {
                //             res(user);
                //         } else {
                //             throw new Error('Password is wrong!');
                //         }
                //     });
                // });

                if (bcrypt.compareSync(password, user.passHash)) {
                    return user;
                }
                throw new Error('Password is wrong!');
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    }));

    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));

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
};

module.exports = { applyTo };
