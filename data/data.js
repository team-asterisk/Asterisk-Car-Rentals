const CarsData = require('./models.data/cars.data');
const CarCategoriesData = require('./models.data/carCategories.data');
const DealsData = require('./models.data/deals.data');
const ReviewsData = require('./models.data/reviews.data');
const CommentsData = require('./models.data/comments.data');
const UsersData = require('./models.data/users.data');

const init = (db) => {
    return Promise.resolve({
        cars: new CarsData(db),
        carCategories: new CarCategoriesData(db),
        deals: new DealsData(db),
        reviews: new ReviewsData(db),
        comments: new CommentsData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
