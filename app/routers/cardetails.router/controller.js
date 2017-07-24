const init = (data) => {
    const controller = {
        async getAll(req, res) {
            const viewModel = await generateViewModel(data);
            console.log(viewModel);
            return res.render('./public/car-details', { context: viewModel });
            // return data.cars.getAll()
            //     .then((cars) => {
            //         console.log(cars);
            //         // return res.render('./public/car-details', {
            //         //     context: cars,
            //         // });
            //     });
        },
    };

    return controller;
};

//TO BE MOVED TO modelview.js
async function generateViewModel(data) {

    //concurrently retrieving items
    const [cars, comments] = await Promise.all([data.cars.getAll(),
    data.comments.getAll()]);

    //generating a specfic viewModel for our needs
    const viewModel = {
        cars,
        comments
    };

    return viewModel;
}
module.exports = { init };