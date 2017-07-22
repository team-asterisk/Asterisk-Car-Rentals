class Review {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.text === 'string' &&
            model.text.length > 40;
        // todo: other properties validation
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Review();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Review;
