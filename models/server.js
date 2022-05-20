// Servidor de express
const express = require('express')
const http = require("http");
const socketio = require('socket.io');
const app = express();
const path = require('path');
const Sockets = require('./sockets')
// Servidor de sockets



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Https
        this.server = http.createServer(this.app)

        // Configuracion del socket
        this.io = socketio(this.server, {/*Configuraciones */})

    }

    middelwares(){
        this.app.use(express.static( path.resolve(__dirname, '../public')));

    }

    configurarSockets(){
        new Sockets(this.io)
    }

    execute() {
        this.middelwares();

        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log('Conexion en el puerto', this.port)
        });
    }
}

module.exports = Server
