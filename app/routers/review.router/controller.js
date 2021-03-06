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
        return this.data.reviews.create(review, user)
            .then(() => {
                req.toastr.success('Thank you for your review!!', 'Success!');
                return res.status(200).redirect('/');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.status(400).redirect('/auth/review');
            });
    }
}

const init = (data) => {
    return new ReviewController(data);
};

module.exports = { init };
