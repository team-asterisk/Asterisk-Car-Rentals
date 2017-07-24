const BaseData = require('../base/base.data');
const Review = require('../../models/review.model');

class ReviewsData extends BaseData {
    constructor(db) {
        super(db, Review);
    }
}

module.exports = ReviewsData;
