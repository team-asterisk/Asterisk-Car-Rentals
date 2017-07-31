//PORTA E MNOGO VAJEN
var socket = io.connect('http://localhost:3001');

socket.on('user logged out', (data) => {
    // toastr.error('To all clients', 'Attention!');
    toastr.info('User has book', 'Booking added',
        {
            animate: 'flyRight',
            toastLife: 5000,
            'progressBar': false,
            'positionClass': 'toast-top-center',
            'preventDuplicates': false,
            'showDuration': '1000',
            'hideDuration': '1000',
            'timeOut': '1200',
            'extendedTimeOut': '1000',
            onclick: function () { window.location.assign("http://localhost:3001/auth/viewbookings"); }
        })

});
