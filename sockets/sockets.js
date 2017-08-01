const applyTo = (http) => {
    const io = require('socket.io')(http);

    // obache raboti samo za main
    io.on('connection', (socket) => {

    });

    return io;
};

module.exports = { applyTo };
