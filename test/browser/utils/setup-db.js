const MongoClient = require('mongodb').MongoClient;
const { connectionString } = require('../config');
const url = connectionString;

const setupDb = () => {
    const insertCar = function(db) {
        db.collection('cars').insertOne( {
            makemodel: 'Proba',
            category: 'Economy',
            adultscount: '3',
            bagscount: '3',
            doorscount: '3',
            fueltype: 'Petrol',
            transmission: 'Manual',
            mileage: '33',
            yearofmanufacture: '2010',
            baseprice: '33',
            specialprice: '22',
            specialpriceactivated: '1',
            carphotolink: 'static/images/cars/car-full-size.png',
            comments: [],
            booked: [],
        }, function(err, result) {
            if (err) {
                console.log(err.message);
            }
            console.log('Inserted a car into the cars collection.');
        });
    };

    const insertAdmin = function(db) {
        db.collection('users').insertOne( {
            name: 'Admin',
            username: 'admin',
            phone: '0899999999',
            email: 'admin@admin.com',
            role: 'admin',
            bookings: [],
            passHash: '$2a$10$PH7orI63mOtlXBsnXxzrPefQwOK796JpXSi2tNyNpjZLtNlqw/bnG',
        }, function(err, result) {
            if (err) {
                console.log(err.message);
            }
            console.log('Inserted a admin into the users collection.');
        });
    };

    MongoClient.connect(url, function(err, db) {
        insertCar(db);
        insertAdmin(db);
        db.close();
    });
};

module.exports = { setupDb };
