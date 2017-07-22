const BaseData = require('../base/base.data');
const CarCategory = require('../../models/carCategory.model');

class CarCategoriesData extends BaseData {
    constructor(db) {
        super(db, CarCategory, CarCategory);
    }

    _isModelValid(model) {
        // custom validation here
        return super._isModelValid(model);
    }
}

module.exports = CarCategoriesData;
