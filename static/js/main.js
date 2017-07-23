$(() => {
    // configure toastr
    // http://codeseven.github.io/toastr/demo.html
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "100",
        "timeOut": "1200",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    };

    let startDate;
    let endDate;
    let now = new Date();

    $('.datepicker-from')
        .datepicker()
        .on('changeDate', (ev) => {
            if (ev.date.valueOf() < now.valueOf()) {
                toastr.error("Today or future date is required!", "Attention!");
            }
            if (endDate && (ev.date.valueOf() > endDate.valueOf())) {
                toastr.error("Pick-up date must be before end date!", "Attention!");
            }
            startDate = ev.date;
        });
    $('.datepicker-to')
        .datepicker()
        .on('changeDate', (ev) => {
            if (ev.date.valueOf() < now.valueOf()) {
                toastr.error("Future date is required!", "Error!");
            }
            if (startDate && (ev.date.valueOf() < startDate.valueOf())) {
                toastr.error("End date must be after pickup date!", "Attention!");
            }
            endDate = ev.date;
        });
});