class CarController {
    constructor(data) {
        this.data = data;
    }

    getAddCarForm(req, res) {
        return res.render('auth/admin/addcar', { req: req });
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

    getCarsFromCategory(req, res) {
        Promise.resolve(this.data.cars.filterBy({ 'category': req.params.category }))
            .then((cars) => {
                return res.render('./public/category', {
                    context: cars,
                    category: req.params.id,
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
                        car,
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
                return res.status(200).redirect('/auth/addcar');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.status(400).redirect('/auth/addcar');
            });
    }

    updateCar(req, res) {
        const bodyCar = req.body;
        if (req.file) {
            const carPhotoFileName = req.file.originalname;
            const carPhotoLink = req.file.destination + carPhotoFileName;
            bodyCar.carphotolink = carPhotoLink;
        }

        return this._updateCarProperties(req.params.id, bodyCar)
            .then((car) => {
                return this.data.cars.updateById(car);
            })
            .then(() => {
                req.toastr.success('Successfuly updated this car!', 'Success!');
                return res.status(200).redirect('/auth/viewcars');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.status(400).redirect('/auth/viewcars');
            });
    }

    _updateCarProperties(carId, car) {
        return this.data.cars.findById(carId)
            .then((dbCar) => {
                if (!car.carphotolink) {
                    car.carphotolink = dbCar.carphotolink;
                }

                car._id = dbCar._id;
                car.comments = dbCar.comments;
                car.booked = dbCar.booked;

                return Promise.resolve(car);
            });
    }
}

const init = (data) => {
    return new CarController(data);
};

module.exports = { init };
