class CarController {
    constructor(data) {
        this.data = data;
    }

    getAddCarForm(req, res) {
        return res.render('auth/admin/addcar');
    }

    getEditCarForm(req, res) {
        return res.render('auth/admin/editcar');
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
                return res.redirect('/auth/addcar');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.status(400)
                    .redirect('/auth/addcar');
            });
    }
}

const init = (data) => {
    return new CarController(data);
};

module.exports = { init };
