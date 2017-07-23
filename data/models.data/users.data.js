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
}

module.exports = UsersData;
