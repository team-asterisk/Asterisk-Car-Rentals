class Car {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.brand === 'string' &&
            model.brand.length > 2;
        // todo: other properties validation
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Car();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Car;
