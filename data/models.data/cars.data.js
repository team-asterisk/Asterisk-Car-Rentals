const BaseData = require('../base/base.data');
const Car = require('../../models/car.model').Car;
// eslint-disable-next-line prefer-const
let initCar = require('../../models/car.model').initCar;
// eslint-disable-next-line prefer-const
let { initComment } = require('../../models/comment.model');
const { ObjectID } = require('mongodb');

class CarsData extends BaseData {
    constructor(db) {
        super(db, Car);
    }

    findByBookingId(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    create(car, photoLink) {
        let newInstance;

        try {
            newInstance = initCar(car, photoLink);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.collection.insert(newInstance)
            .then(() => {
                return newInstance;
            });
    }

    createComment(comment, user, carId) {
        let newInstance;

        try {
            newInstance = initComment(comment, user);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.collection.update({ _id: new ObjectID(carId) }, {
            $addToSet: {
                comments: newInstance,
            },
        });
    }
}

module.exports = CarsData;
