const init = (server) => {
    const io = require('socket.io')(server);

    
    return Promise.resolve(io);
};

module.exports = { init };