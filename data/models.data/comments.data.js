const BaseData = require('../base/base.data');
const Comment = require('../../models/comment.model');

class CommentsData extends BaseData {
    constructor(db) {
        super(db, Comment);
    }

    create(comment, user) {
        // Property validation instead of method validation
        let newInstance;

        try {
            newInstance = new Comment(comment, user);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.collection.insert(newInstance)
            .then(() => {
                return newInstance;
            });
    }
}

module.exports = CommentsData;
