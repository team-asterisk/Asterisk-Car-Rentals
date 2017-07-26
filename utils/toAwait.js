/* global global*/

global.to = (promise) => {
    return promise
        .then((data) => {
            return { data, err: null };
        })
        .catch((err) => {
            return { err };
        });
};

