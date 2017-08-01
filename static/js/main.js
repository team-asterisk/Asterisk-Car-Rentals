$(() => {
    // configure toastr
    // http://codeseven.github.io/toastr/demo.html
    toastr.options = {
        'closeButton': false,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-top-center',
        'preventDuplicates': true,
        'onclick': null,
        'showDuration': '100',
        'hideDuration': '100',
        'timeOut': '1200',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'slideDown',
        'hideMethod': 'slideUp'
    };

    $('#sort_by_price')
        .on('change', function(ev) {
            var list = $('#car-rentals .col-xs-12');

            list.sort(function(a, b) {
                p1 = parseInt($(a).attr('price'), 10);
                p2 = parseInt($(b).attr('price'), 10);
                if (ev.target.value == 'ascending') {
                    return p1 - p2;
                }
                return p2 - p1;
            }).each(function() {
                var elem = $(this);
                elem.remove();
                $(elem).appendTo('#car-rentals .row');
            });
        });

    $('#sort_by_price_admin')
        .on('change', function(ev) {
            var list = $('#view-cars .cars-list-only');

            list.sort(function(a, b) {
                p1 = parseInt($(a).attr('price'), 10);
                p2 = parseInt($(b).attr('price'), 10);
                if (ev.target.value == 'ascending') {
                    return p1 - p2;
                }
                return p2 - p1;
            }).each(function() {
                var elem = $(this);
                elem.remove();
                $(elem).appendTo('#view-cars .row');
            });
        });

    var startDate = $('.datepicker-from').datepicker().date;
    var endDate = $('.datepicker-to').datepicker().date;;
    var now = new Date() - 24 * 60 * 60 * 1000;

    $('.datepicker-from, .datepicker-to').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: "auto bottom",
    });

    $('.datepicker-from')
        .datepicker()
        .on('changeDate', function(ev) {
            if (ev.date.valueOf() < now.valueOf()) {
                toastr.error('Today or future date is required!', 'Attention!');
                $(ev.target).val('');
            }
            if (endDate && (ev.date.valueOf() > endDate.valueOf())) {
                toastr.error('Pick-up date must be before end date!', 'Attention!');
                $(ev.target).val('');
            }
            startDate = ev.date;
        });
    $('.datepicker-to')
        .datepicker()
        .on('changeDate', function(ev) {
            if (ev.date.valueOf() < now.valueOf()) {
                toastr.error('Future date is required!', 'Error!');
                $(ev.target).val('');
            }
            if (startDate && (ev.date.valueOf() < startDate.valueOf())) {
                toastr.error('End date must be after pickup date!', 'Attention!');
                $(ev.target).val('');
            }
            endDate = ev.date;

            var elem = $('.automatic-price');
            var special = +elem.attr('special');
            var base = +elem.attr('base');
            var activated = +elem.attr('activated');
            var p = calculatePrice(endDate, startDate, base, special, activated);
            elem.html(p);
        });

    // $('.search-form-btn')
    //     .click(() => {

    //         startDate = $('.datepicker-from').val();
    //         endDate = $('.datepicker-to').val();

    //         if (!startDate || !endDate) {
    //             toastr.info('Dates are required!', 'Note.');
    //         }
    //         if (startDate.valueOf() < now.valueOf() || endDate.valueOf() < now.valueOf()) {
    //             toastr.warning('Please provide correct dates!', 'Attention!');
    //         }
    //     });

    $('.add-booking-button')
        .on('click', function() {
            if (isNaN(+$('.automatic-price').html())) {
                throw new Error('Empty date is not allowed!');
            }
        });

    $('#carphotoimg').click(function() {
        $('#carphoto').trigger('click');
    });

    function calculatePrice(d2, d1, base, special, activated) {
        var price = base;

        if (activated === 1) {
            price = special;
        }

        if ((d1 && d2) && d1.valueOf() < d2.valueOf()) {
            var totalDays = Math.round((d2.valueOf() - d1.valueOf()) / (1000 * 60 * 60 * 24));
            return (totalDays * price).toFixed(2);
        } else {
            return 0;
        }
    }
});