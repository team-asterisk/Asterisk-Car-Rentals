class CommentController {
    constructor(data) {
        this.data = data;
    }

    addComment(req, res) {
        const comment = req.body;
        const user = req.user;
        this.data.comments.create(comment, user)
            .then(() => {
                req.toastr.success('Thank you for your comment!', 'Success!');
                return res.redirect('/cardetails');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.redirect('/cardetails');
            });
    }
}

const init = (data) => {
    return new CommentController(data);
};

module.exports = { init };
