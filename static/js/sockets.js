//PORTA E MNOGO VAJEN
var socket = io.connect('http://localhost:3001');
// -> v tozi moment servera si slaga event listeneri


//tova realno e eventa za koito slusha servera
// socket.emit('message', {
//     text: "Hello it finally works"
// });

// socket.on('to client', (data) => {
//     //pravim neshto s datata
//     console.log("Message received");
//     console.log(data);
// });

//tova prosto trqbva da go ima samo na edno mqsto
// ili na vsichki kadeto e administratora?
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
    // console.log("To all clients");
    // console.log(data);

});

// socket.on('news', function (data) {
//     console.log(data);
//     socket.emit('my other event', { my: 'data' });
// });