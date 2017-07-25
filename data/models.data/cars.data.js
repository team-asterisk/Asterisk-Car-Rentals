const BaseData = require('../base/base.data');
const Car = require('../../models/car.model');

class CarsData extends BaseData {
    constructor(db) {
        super(db, Car);
    }

    create(car) {
        let newInstance;

        try {
            newInstance = new Car(car);
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
