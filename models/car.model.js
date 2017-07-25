const validator = require('../utils').validator;
const size = require('../utils').constants.size;
const convert = require('../utils/inputConverter').convert;

class Car {
    constructor(model) {
        this.makemodel = model.makemodel;
        this.category = model.category;
        this.carphoto = model.carphoto;
        this.adultscount = model.adultscount;
        this.bagscount = model.bagscount;
        this.doorscount = model.doorscount;
        this.fueltype = model.fueltype;
        this.transmission = model.transmission;
        this.mileage = model.mileage;
        this.yearofmanufacture = model.yearofmanufacture;
        this.airconditioner = model.airconditioner;
        this.baseprice = model.baseprice;
        this.specialprice = model.specialprice;
        this.specialpriceactivated = model.specialpriceactivated;
        this.comments = [];
        this.booked = [];
    }

    get id() {
        return this._id;
    }

    get makemodel() {
        return this._makemodel;
    }

    set makemodel(value) {
        const name = convert(value);
        if (validator.validateString(name, size.MIN_NAME, size.MAX_NAME)) {
            this._makemodel = name;
        } else {
            throw new Error('Invalid car make and model');
        }
    }

    get category() {
        return this._category;
    }

    set category(value) {
        const name = convert(value);
        if (validator.validateString(name, size.MIN_NAME, size.MAX_NAME)) {
            this._category = name;
        } else {
            throw new Error('Invalid category name');
        }
    }

    get carphoto() {
        return this._carphoto;
    }

    set carphoto(value) {
        this._carphoto = value;
    }

    get adultscount() {
        return this._adultscount;
    }

    set adultscount(value) {
        const count = parseInt(value, 10);
        if (typeof count !== 'number' || (count < 2 && count > 20)) {
            throw new Error('Invalid adultscount');
        }
        this._adultscount = count;
    }

    get bagscount() {
        return this._bagscount;
    }

    set bagscount(value) {
        const count = parseInt(value, 10);
        if (typeof count !== 'number' || (count < 2 && count > 20)) {
            throw new Error('Invalid bagscount');
        }
        this._bagscount = count;
    }

    get doorscount() {
        return this._doorscount;
    }

    set doorscount(value) {
        const count = parseInt(value, 10);
        if (typeof count !== 'number' || (count < 2 && count > 5)) {
            throw new Error('Invalid doorscount');
        }
        this._doorscount = count;
    }

    get fueltype() {
        return this._fueltype;
    }

    set fueltype(value) {
        const fuelType = convert(value);
        if (validator.validateString(fuelType, size.MIN_NAME, size.MAX_NAME)) {
            this._fueltype = fuelType;
        } else {
            throw new Error('Invalid fuel type name');
        }
    }

    get transmission() {
        return this._transmission;
    }

    set transmission(value) {
        const transmissionType = convert(value);
        if (validator.validateString(transmissionType, size.MIN_NAME, size.MAX_NAME)) {
            this._transmission = transmissionType;
        } else {
            throw new Error('Invalid transmission type');
        }
    }

    get mileage() {
        return this._mileage;
    }

    set mileage(value) {
        const mpg = parseInt(value, 10);
        if (typeof mpg !== 'number' || (mpg < 1 && mpg > 200)) {
            throw new Error('Invalid mileage');
        }
        this._mileage = mpg;
    }

    get yearofmanufacture() {
        return this._yearofmanufacture;
    }

    set yearofmanufacture(value) {
        const year = parseInt(value, 10);
        if (typeof year !== 'number' || (year < 2010 && year > 2020)) {
            throw new Error('Invalid year of manufacture');
        }
        this._yearofmanufacture = year;
    }

    get airconditioner() {
        return this._airconditioner;
    }

    set airconditioner(value) {
        const ac = parseInt(value, 10);
        if (typeof ac !== 'number' || (ac < 0 && ac > 1)) {
            throw new Error('Invalid feature air conditioner');
        }
        this._airconditioner = ac;
    }

    get baseprice() {
        return this._baseprice;
    }

    set baseprice(value) {
        const price = parseFloat(value, 10);
        if (typeof price !== 'number' || (price < 0 && price > 2000)) {
            throw new Error('Invalid base price');
        }
        this._baseprice = price;
    }

    get specialprice() {
        return this._specialprice;
    }

    set specialprice(value) {
        const price = parseFloat(value, 10);
        if (typeof price !== 'number' || (price < 0 && price > 2000)) {
            throw new Error('Invalid special price');
        }
        this._specialprice = price;
    }

    get specialpriceactivated() {
        return this._specialpriceactivated;
    }

    set specialpriceactivated(value) {
        const special = parseInt(value, 10);
        if (typeof special !== 'number' || (special < 0 && special > 1)) {
            throw new Error('Invalid feature special price activated');
        }
        this._specialpriceactivated = special;
    }
}

module.exports = Car;
