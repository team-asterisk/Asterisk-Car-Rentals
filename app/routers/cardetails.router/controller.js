const init = (data) => {
    const controller = {
        async getAll(req, res) {
            const user = req.user;
            const viewModel = await generateViewModel(data, user);
            console.log(viewModel);
            return res.render('./public/car-details', { context: viewModel, req: req });
        },
    };

    return controller;
};

// TO BE MOVED TO modelview.js
async function generateViewModel(data, currentUser) {
    // concurrently retrieving items
    const [cars, comments, user] = await Promise.all([data.cars.getAll(),
        data.comments.getAll(), currentUser,
    ]);

    // generating a specfic viewModel for our needs
    const viewModel = {
        cars,
        comments,
        user,
    };

    return viewModel;
}
module.exports = { init };
