const BaseData = require('../base/base.data');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    create(model) {
        let newInstance;

        try {
            newInstance = new User(model);
        } catch (error) {
            return Promise.reject(error);
        }

        return this._generateHash(newInstance)
            .then((user) => {
                return this.collection.insert(user);
            })
            .then((inserted) => {
                return inserted;
            });
    }

    update(model) {
        let newInstance;

        try {
            newInstance = new User(model);
        } catch (error) {
            return Promise.reject(error);
        }

        return this._generateHash(newInstance)
            .then((user) => {
                return this.collection.update(user);
            })
            .then((updated) => {
                return updated;
            });
    }

    _generateHash(bodyUser) {
        const promise = new Promise((res, rej) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return rej(err);
                }
                return bcrypt.hash(bodyUser._password, salt, (error, hash) => {
                    if (err) {
                        return rej(error);
                    }

                    bodyUser.passHash = hash;
                    delete bodyUser._password;

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

module.exports = UsersData;
