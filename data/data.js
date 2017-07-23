const CarsData = require('./models.data/cars.data');
const ReviewsData = require('./models.data/reviews.data');
const CommentsData = require('./models.data/comments.data');
const UsersData = require('./models.data/users.data');

const init = (db) => {
    return Promise.resolve({
        cars: new CarsData(db),
        reviews: new ReviewsData(db),
        comments: new CommentsData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
