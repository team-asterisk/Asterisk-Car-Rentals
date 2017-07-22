const BaseData = require('../base/base.data');
const Review = require('../../models/review.model');

class ReviewsData extends BaseData {
    constructor(db) {
        super(db, Review, Review);
    }

    _isModelValid(model) {
        // custom validation here
        return super._isModelValid(model);
    }
}

module.exports = ReviewsData;
