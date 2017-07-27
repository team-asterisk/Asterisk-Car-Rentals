const BaseData = require('../base/base.data');
const Comment = require('../../models/comment.model');

class CommentsData extends BaseData {
    constructor(db) {
        super(db, Comment);
        this.cars = this.db.collection('cars');
    }

    create(comment, user, carId) {
        // Property validation instead of method validation
        let newInstance;

        try {
            newInstance = new Comment(comment, user);
        } catch (error) {
            return Promise.reject(error);
        }

        const newCar = this.db.cars.findById(carId);
        newCar.comments.push(newInstance);

        return this.cars.ipdateByID(newCar)
            .then(() => {
                return newInstance;
            });
    }
}

module.exports = CommentsData;
