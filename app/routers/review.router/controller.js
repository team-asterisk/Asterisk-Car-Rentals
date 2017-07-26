class ReviewController {
    constructor(data) {
        this.data = data;
    }

    getReviewForm(req, res) {
        return res.render('auth/review', { req: req });
    }

    addReview(req, res) {
        const review = req.body;
        const user = req.user;
        this.data.reviews.create(review, user)
            .then(() => {
                req.toastr.success('Thank you for your review!!', 'Success!');
                return res.redirect('/');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.redirect('/auth/review');
            });
    }
}

const init = (data) => {
    return new ReviewController(data);
};

module.exports = { init };
