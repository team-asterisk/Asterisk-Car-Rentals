const BaseData = require('../base/base.data');
// eslint-disable-next-line prefer-const
let initReview = require('../../models/review.model').initReview;
const Review = require('../../models/review.model').Review;

class ReviewsData extends BaseData {
    constructor(db) {
        super(db, Review);
    }

    create(review, user) {
        // Property validation instead of method validation
        let newInstance;

        try {
            newInstance = initReview(review, user);
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
