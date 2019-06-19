//SECTION 1 FRONT-END: CONECTAR UN USUARIO
//SECTION 2 DESCONECTAR USUARIOS
//SECTION 3 ENVIANDO UN MENSAJE A TODO EL GRUPO "SE CREA UNA CARPETA DENTRO DE SERVER "UTILIDADES""
//SECTION 4 ENVIAR UN MENSAJE A UN USUARIO EN ESPECIFICO
//SECTION 5 SALAS DE CHAT
//NOTE 1
//NOTE 2
//NOTE 3
//NOTE 4
//NOTE 5

var socket = io();

//NOTE 1 LEER POR PARAMETRO EL NOMBRE DEL USUARIO
var params = new URLSearchParams(window.location.search);

//NOTE 1 OBJETO PARAMS
//NOTE 5 SE AGREGA PARAMETROS DE SALA
if (!params.has('nombre') || !params.has('sala') ){
    
    window.location = 'index.html';
    
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {

    nombre: params.get('nombre'),
    //NOTE 5
    sala: params.get('sala')

};


socket.on('connect', function() {
    console.log('Conectado al servidor');

    //SECTION 1
    //NOTE 1 MARCA QUIEN SE CONECTO EN EL CHAT
    //SE CONFIGURA EL LISTENER EN SOCKET.JS
    socket.emit('entrarChat', usuario, function( resp ) {
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


/* // Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Ignacio',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
//NOTE 2 CREAR MENSAJE
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//NOTE 2 ESCUCHAR CAMBIOS DE USUARIOS
//CUANDO UN USUARIO ENTRA O SALE DEL CHAT
socket.on('listaPersona', function( personas ) {

    console.log( personas );

});

//NOTE 4 
socket.on( 'mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});