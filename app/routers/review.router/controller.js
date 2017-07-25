class ReviewController {
    constructor(data) {
        this.data = data;
    }

    getReviewForm(req, res) {
        return res.render('auth/review');
    }

    addReview(req, res) {
        const review = req.body;
        const user = req.user;
        this.data.reviews.create(review, user)
            .then(() => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.redirect('/auth/review');
            });
    }
}

const init = (data) => {
    return new ReviewController(data);
};

module.exports = { init };
