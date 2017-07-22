const BaseData = require('../base/base.data');
const Deal = require('../../models/deal.model');

class DealsData extends BaseData {
    constructor(db) {
        super(db, Deal, Deal);
    }

    _isModelValid(model) {
        // custom validation here
        return super._isModelValid(model);
    }
}

module.exports = DealsData;
