const BaseData = require('../base/base.data');
const Car = require('../../models/car.model');

class CarsData extends BaseData {
    constructor(db) {
        super(db, Car, Car);
    }

    _isModelValid(model) {
        // custom validation here
        return super._isModelValid(model);
    }
}

module.exports = CarsData;
