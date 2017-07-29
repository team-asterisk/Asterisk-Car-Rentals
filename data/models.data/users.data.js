const BaseData = require('../base/base.data');
const User = require('../../models/user.model').User;
// eslint-disable-next-line prefer-const
let initUser = require('../../models/user.model').initUser;
// eslint-disable-next-line prefer-const
let generateHash = require('./users.hash.generator');

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

        return generateHash(newInstance)
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
        } catch (error) {
            return Promise.reject(error);
        }

        return generateHash(newInstance)
            .then((user) => {
                return this.collection.updateOne({
                    _id: user._id,
                }, user);
            })
            .then((updated) => {
                return updated;
            });
    }
}

module.exports = UsersData;
