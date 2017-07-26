const init = (data) => {
    const controller = {
        async getAll(req, res) {
            const user = req.user;
            const carId = req.params.id;
            const viewModel = await generateViewModel(data, user, carId);
            return res.render('./public/car-details', { context: viewModel, req: req });
        },
    };

    return controller;
};

// TO BE MOVED TO modelview.js
async function generateViewModel(data, currentUser, carId) {
    // concurrently retrieving items
    const car = await data.cars.findById(carId);

    // generating a specfic viewModel for our needs
    const viewModel = {
        car,
        comments: car.comments,
        currentUser,
    };

    return viewModel;
}

module.exports = { init };
