var socket = io.connect('http://localhost:3001');

socket.emit('message', {
    text: "Hello server"
});