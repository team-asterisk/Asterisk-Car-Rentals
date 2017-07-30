const { validator } = require('../utils/validator');
const convert = require('../utils/inputConverter').convert;

class Car {
    constructor(model, photoLink) {
        this._makemodel = model.makemodel;
        this._category = model.category;
        this._carphotolink = photoLink;
        this._adultscount = model.adultscount;
        this._bagscount = model.bagscount;
        this._doorscount = model.doorscount;
        this._fueltype = model.fueltype;
        this._transmission = model.transmission;
        this._mileage = model.mileage;
        this._yearofmanufacture = model.yearofmanufacture;
        this._airconditioner = model.airconditioner;
        this._baseprice = model.baseprice;
        this._specialprice = model.specialprice;
        this._specialpriceactivated = model.specialpriceactivated;
        this.comments = [];
        this.booked = [];
    }

    get id() {
        return this._id;
    }

    get _makemodel() {
        return this.makemodel;
    }

    set _makemodel(value) {
        const nameVal = convert(value);
        validator.validateIfUndefinedOrNull(nameVal, 'Model');
        validator.validateTypeOf(nameVal, 'Model', 'string');
        validator.validateIfEmptyString(nameVal, 'Model');
        this.makemodel = nameVal;
    }

    get _category() {
        return this.category;
    }

    set _category(value) {
        const name = convert(value);
        validator.validateIfUndefinedOrNull(name, 'Name');
        validator.validateTypeOf(name, 'Name', 'string');
        validator.validateIfEmptyString(name, 'Name');
        this.category = name;
    }

    get _carphotolink() {
        return this.carphotolink;
    }

    set _carphotolink(value) {
        const link = convert(value).replace(/&#x2F;/g, '/');
        validator.validateIfUndefinedOrNull(link, 'PhotoLink');
        validator.validateImageExtension(link);
        validator.validateIfEmptyString(link, 'PhotoLink');
        this.carphotolink = link;
    }

    get _adultscount() {
        return this.adultscount;
    }

    set _adultscount(value) {
        const count = parseInt(value, 10);
        validator.validateIfUndefinedOrNull(count, 'Adults count');
        validator.validateIfNumber(count, 'Adults count');
        validator.validateIfEmptyString(count, 'Adults count');
        if (count < 2 || count > 20) {
            throw new Error('Invalid adults count - must be in range 2-20');
        }
        this.adultscount = count;
    }

    get _bagscount() {
        return this.bagscount;
    }

    set _bagscount(value) {
        const count = parseInt(value, 10);
        validator.validateIfUndefinedOrNull(count, 'Bags count');
        validator.validateIfNumber(count, 'Bags count');
        validator.validateIfEmptyString(count, 'Bags count');
        if (count < 2 || count > 20) {
            throw new Error('Invalid bags count - must be in range 2-20');
        }
        this.bagscount = count;
    }

    get _doorscount() {
        return this.doorscount;
    }

    set _doorscount(value) {
        const count = parseInt(value, 10);
        validator.validateIfUndefinedOrNull(count, 'Doors count');
        validator.validateIfNumber(count, 'Doors count');
        validator.validateIfEmptyString(count, 'Doors count');
        if (count < 2 || count > 5) {
            throw new Error('Invalid doors count - must be in range 2-5');
        }
        this.doorscount = count;
    }

    get _fueltype() {
        return this.fueltype;
    }

    set _fueltype(value) {
        const fuelType = convert(value);
        validator.validateIfUndefinedOrNull(fuelType, 'Fuel Type');
        validator.validateTypeOf(fuelType, 'Fuel Type', 'string');
        validator.validateIfEmptyString(fuelType, 'Fuel Type');
        this.fueltype = fuelType;
    }

    get _transmission() {
        return this.transmission;
    }

    set _transmission(value) {
        const transmissionType = convert(value);
        validator.validateIfUndefinedOrNull(transmissionType, 'Transmission Type');
        validator.validateTypeOf(transmissionType, 'Transmission Type', 'string');
        validator.validateIfEmptyString(transmissionType, 'Transmission Type');
        this.transmission = transmissionType;
    }

    get _mileage() {
        return this.mileage;
    }

    set _mileage(value) {
        const mpg = parseInt(value, 10);
        validator.validateIfUndefinedOrNull(mpg, 'Mileage');
        validator.validateIfNumber(mpg, 'Mileage');
        validator.validateIfEmptyString(mpg, 'Mileage');
        if (mpg < 1 || mpg > 200) {
            throw new Error('Invalid mileage - must be in range 1-200');
        }
        this.mileage = mpg;
    }

    get _yearofmanufacture() {
        return this.yearofmanufacture;
    }

    set _yearofmanufacture(value) {
        const year = parseInt(value, 10);
        validator.validateIfUndefinedOrNull(year, 'Year of manufacture');
        validator.validateIfNumber(year, 'Year of manufacture');
        validator.validateIfEmptyString(year, 'Year of manufacture');
        if (year < 2010 || year > 2020) {
            throw new Error('Invalid year of manufacture - must be in range 2010-2020');
        }
        this.yearofmanufacture = year;
    }

    get _airconditioner() {
        return this.airconditioner;
    }

    set _airconditioner(value) {
        if (typeof value === 'undefined') {
            value = 0;
        }

        validator.validateIfUndefinedOrNull(value, 'Air conditioner');
        validator.validateIfNumber(value, 'Air conditioner');
        validator.validateIfEmptyString(value, 'Air conditioner');
        if (value < 0 || value > 1) {
            throw new Error('Invalid feature air conditioner');
        }

        this.airconditioner = value;
    }

    get _baseprice() {
        return this.baseprice;
    }

    set _baseprice(value) {
        const price = parseFloat(value, 10);
        validator.validateIfUndefinedOrNull(price, 'Base price');
        validator.validateIfNumber(price, 'Base price');
        validator.validateIfEmptyString(price, 'Base price');
        if (price < 0 || price > 2000) {
            throw new Error('Invalid base price - must be in range 0-2000');
        }

        this.baseprice = price;
    }

    get _specialprice() {
        return this.specialprice;
    }

    set _specialprice(value) {
        const price = parseFloat(value, 10);
        validator.validateIfUndefinedOrNull(price, 'Special price');
        validator.validateIfNumber(price, 'Special price');
        validator.validateIfEmptyString(price, 'Special price');
        if (price < 0 || price > 2000) {
            throw new Error('Invalid special price - must be in range 0-2000');
        }

        this.specialprice = price;
    }

    get _specialpriceactivated() {
        return this.specialpriceactivated;
    }

    set _specialpriceactivated(value) {
        if (typeof value === 'undefined') {
            value = 0;
        }

        validator.validateIfUndefinedOrNull(value, 'Special price');
        validator.validateIfNumber(value, 'Special price');
        validator.validateIfEmptyString(value, 'Special price');
        if (value < 0 || value > 1) {
            throw new Error('Invalid feature special price activated');
        }

        this.specialpriceactivated = value;
    }
}


const initCar = (model, photoLink) => {
    return new Car(model, photoLink);
};

module.exports = { Car, initCar };
