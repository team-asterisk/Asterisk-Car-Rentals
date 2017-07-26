const BaseData = require('../base/base.data');
const Car = require('../../models/car.model');
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
            newInstance = new Car(car, photoLink);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.collection.insert(newInstance)
            .then(() => {
                return newInstance;
            });
    }
}

module.exports = CarsData;
