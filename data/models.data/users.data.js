const BaseData = require('../base/base.data');
const User = require('../../models/user.model');

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
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed!');
        }
        delete model.password;
        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }
}

module.exports = UsersData;
