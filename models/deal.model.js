class Deal {
    static isValid(model) {
        return typeof model !== 'undefined';
        // todo: other properties validation
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Deal();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Deal;
