const size = {
    MIN_NAME: 2,
    MAX_NAME: 80,
    MIN_PASS: 3,
    MAX_PASS: 80,
    MIN_EMAIL: 3,
    MAX_EMAIL: 200,
    MIN_TEXT: 10,
    MAX_TEXT: 1000,
};

const toastrOptions = {
    'closeButton': true,
    'debug': false,
    'newestOnTop': false,
    'progressBar': false,
    'positionClass': 'toast-top-center',
    'preventDuplicates': true,
    'onclick': null,
    'showDuration': '500',
    'hideDuration': '100',
    'timeOut': '2200',
    'extendedTimeOut': '2000',
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'slideDown',
    'hideMethod': 'slideUp',
};

module.exports = { size, toastrOptions };
