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
        // if (!req.file) {
        //     return res.status(400).send('No files were uploaded.');
        // }

        const carPhotoFileName = req.file.originalname;
        const newCar = bodyCar;
        newCar.carphotolink = req.file.destination + carPhotoFileName;

        this.data.cars.create(newCar)
            .then(() => {
                console.log('stana');
                return res.redirect('/auth/addcar');
            })
            .catch((err) => {
                console.log('ne stana');
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
