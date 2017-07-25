const BaseData = require('../base/base.data');
const Review = require('../../models/review.model');

class ReviewsData extends BaseData {
    constructor(db) {
        super(db, Review);
    }

    create(review, user) {
        // Property validation instead of method validation
        let newInstance;

        try {
            newInstance = new Review(review, user);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.collection.insert(newInstance)
            .then(() => {
                return newInstance;
            });
    }
}

module.exports = ReviewsData;
