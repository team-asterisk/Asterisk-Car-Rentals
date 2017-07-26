class ApiController {
    constructor(data) {
        this.data = data;
    }

    getCarDetails(req, res) {
        Promise.resolve(this.data.cars.findById(req.params.id))
            .then((car) => {
                return res.send({
                        car,
                    },
                );
            });
    }

    searchCars(req, res) {
        // TODO
    }

    getDeals(req, res) {
        Promise.resolve(this.data.cars.filterBy({ 'specialpriceactivated': '1' }))
            .then((deals) => {
                return res.send({
                        deals,
                    },
                );
            });
    }

    getCars(req, res) {
        Promise.resolve(this.data.cars.getAll())
            .then((cars) => {
                return res.send({
                        cars,
                    },
                );
            });
    }

    getCarCategory(req, res) {
        const category = req.params.category;
        Promise.resolve(this.data.cars.filterBy({ 'category': category }))
            .then((cars) => {
                return res.send({
                        cars,
                    },
                );
            });
    }

    viewAllBookings(req, res) {
        // TODO
    }
}

const init = (data) => {
    return new ApiController(data);
};

module.exports = { init };
