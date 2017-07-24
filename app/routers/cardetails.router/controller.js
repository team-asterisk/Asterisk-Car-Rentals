const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.items.getAll()
                .then((items) => {
                    return res.render('./public/car-details', {
                        context: items,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };