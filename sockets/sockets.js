const applyTo = (http) => {
    const io = require('socket.io')(http);

    //obache raboti samo za main
    io.on('connection', (socket) => {
        //for every connection for every user

        //zakachame eventi za koito slushame
        //da ni dava saobshteniq ot clienta
        // socket.on('message', (socketData) => {
        //     console.log(socketData);
        // });

        //prashtame kam klienta KONKRETNIQ
        // socket.emit('to client', {
        //     text: 'From server'
        // });
        // console.log(socket);
        //prez io mojem kam vsichki ili..

        //GLOBAL EMIT za testing
        // io.emit('to all clients', {
        //     text: 'From server to all'
        // });
    });

    return io;
};

module.exports = { applyTo };