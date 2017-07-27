class CarController {
    constructor(data) {
        this.data = data;
    }

    getAddCarForm(req, res) {
        return res.render('auth/admin/addcar', { req: req });
    }

    getEditCarForm(req, res) {
        return res.render('auth/admin/editcar', { req: req });
    }

    getEditCarById(req, res) {
        Promise.resolve(this.data.cars.findById(req.params.id))
            .then((car) => {
                return res.render('auth/admin/editcar', {
                        car,
                    req: req,
                });
            });
    }

    getAllCars(req, res) {
        Promise.resolve(this.data.cars.getAll())
            .then((cars) => {
                return res.render('./public/cars', {
                    context: cars,
                    req: req,
                });
            });
    }

    getAllDeals(req, res) {
        Promise.resolve(this.data.cars.filterBy({ 'specialpriceactivated': '1' }))
            .then((deals) => {
                return res.render('./public/deals', {
                    context: deals,
                    req: req,
                });
            });
    }

    getSingleCar(req, res) {
        Promise.resolve(this.data.cars.findById(req.params.id))
            .then((car) => {
                return res.render('./public/car-details', {
                    result: {
                        car,
                    },
                    req: req,
                });
            });
    }

    addCar(req, res) {
        const bodyCar = req.body;
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }

        const carPhotoFileName = req.file.originalname;
        const carPhotoLink = req.file.destination + carPhotoFileName;

        return this.data.cars.create(bodyCar, carPhotoLink)
            .then(() => {
                req.toastr.success('Successfuly added new car!', 'Success!');
                return res.redirect('/auth/addcar');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.status(400)
                    .redirect('/auth/addcar');
            });
    }

    editCar(req, res) {
        return res.send('Needs implementation!');
    }
}

const init = (data) => {
    return new CarController(data);
};

module.exports = { init };
