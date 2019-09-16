const express = require('express');
const SocketIO = require('socket.io');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(80, (err)=> {});
let io = SocketIO(server);

io.on('connection',(client)=>{

    console.log('Usuario Conectado');

    client.on('disconnect', ()=>{
        console.log('Usuario Desconectado');
    });

    client.on('send', (mensaje)=>{
        client.emit('send', mensaje);
        client.broadcast.emit('send', mensaje);
    });

});