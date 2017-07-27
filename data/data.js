const CarsData = require('./models.data/cars.data');
const ReviewsData = require('./models.data/reviews.data');
const UsersData = require('./models.data/users.data');

const init = (db) => {
    return Promise.resolve({
        cars: new CarsData(db),
        reviews: new ReviewsData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
