const BaseData = require('../base/base.data');
const User = require('../../models/user.model').User;
// eslint-disable-next-line prefer-const
let initUser = require('../../models/user.model').initUser;
const bcrypt = require('bcrypt');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    create(model) {
        let newInstance;

        try {
            newInstance = initUser(model);
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

    updateUser(model) {
        let newInstance;

        try {
            newInstance = initUser(model);
            console.log(newInstance);
        } catch (error) {
            return Promise.reject(error);
        }

        return this._generateHash(newInstance)
            .then((user) => {
                console.log(user);
                return super.updateById(user);
            })
            .then((updated) => {
                return updated;
            });
    }

    _generateHash(bodyUser) {
        return bcrypt.hash(bodyUser.password, 10)
            .then((hash) => {
                bodyUser.passHash = hash;
                delete bodyUser.password;

                if (bodyUser['repeat-password']) {
                    delete bodyUser['repeat-password'];
                }

                return Promise.resolve(bodyUser);
            });
    }
}

module.exports = UsersData;
