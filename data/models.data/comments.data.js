const BaseData = require('../base/base.data');
const Comment = require('../../models/comment.model');

class CommentsData extends BaseData {
    constructor(db) {
        super(db, Comment, Comment);
    }

    _isModelValid(model) {
        // custom validation here
        return super._isModelValid(model);
    }
}

module.exports = CommentsData;
