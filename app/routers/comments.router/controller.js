class CommentController {
    constructor(data) {
        this.data = data;
    }
    addComment(req, res) {
        console.log(req);
        const comment = req.body;
        const user = req.user;
        this.data.comments.create(comment, user)
            .then(() => {
                return res.redirect('/cardetails');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.redirect('/cardetails');
            });
    }
}

const init = (data) => {
    return new CommentController(data);
};

module.exports = { init };
