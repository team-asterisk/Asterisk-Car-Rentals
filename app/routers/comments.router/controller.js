class CommentController {
    constructor(data) {
        this.data = data;
    }

    addComment(req, res) {
        const comment = req.body;
        const carId = req.params.id;
        const user = req.user;
        this.data.cars.createComment(comment, user, carId)
            .then(() => {
                req.toastr.success('Thank you for your comment!', 'Success!');
                return res.redirect('/car/' + carId);
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.redirect('/car/' + carId);
            });
    }
}

const init = (data) => {
    return new CommentController(data);
};

module.exports = { init };
