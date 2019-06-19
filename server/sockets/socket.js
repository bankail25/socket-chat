//SECTION 1 FRONT-END: CONECTAR UN USUARIO
//SECTION 2 DESCONECTAR USUARIOS
//SECTION 3 ENVIANDO UN MENSAJE A TODO EL GRUPO "SE CREA UNA CARPETA DENTRO DE SERVER "UTILIDADES""
//SECTION 4 ENVIAR UN MENSAJE A UN USUARIO EN ESPECIFICO
//SECTION 5 SALAS DE CHAT
//SECTION 6 MENSAJES Y NOTIFICACIONES A LAS SALAS DE CHAT
//NOTE 1
//NOTE 2
//NOTE 3
//NOTE 4
//NOTE 5
//NOTE 6

//NOTE 3 
const { crearMensaje } = require('../utilidades/utilidades');

const { io } = require('../server');
//NOTE 1 
const { Usuarios } = require('../classes/usuarios')

//NOTE 1
const usuarios = new Usuarios();

//NOTE 1
io.on('connection', (client) => {

    //NOTE 1
    client.on('entrarChat', (data, callback) => {
     
        //NOTE 1 VALIDACION SI NO ENCUENTRA EL USUARIO
        if ( !data.nombre || !data.sala ){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        //NOTE 5 UNIR A UNA SALA
        client.join(data.sala);

        //NOTE 1 RETORNA TODOS LOS USARIOS QUE SE ENCUENTRAM CONECTADOS AL SERVIDOR
        let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala );

        //NOTE 2 UN EVENTO QUE TODAS LA PERSONAS ESCUCHEN
        // SE DISPARARA CUANDO UN USUARIO SE SALE Y ENTRA AL CHAT
        //NOTE 6 SE INCRUSTA "to(DATA.SALA)" PARA QUE SOLO AVISE QUIEN SALE Y ENTRA EN UN CHAT DIFERENTE (se agrega getpersonaporsala(data.sala))
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        //NOTE RETORNAR LAS PERSONAS QUE ESTAN EN EL CHAT
        //NOTE 6 SE AGREGA.GETPERSONASPORSALA(DATA.SALA)
        callback(usuarios.getPersonasPorSala(data.sala));
    
    });

    //NOTE 3
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        //NOTE 6 SE ANEXA TO(PERSONA.DATA)
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    });

    //NOTE 2
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona( client.id );

        //NOTE 2 EMITIR UN EVENTO CUANDO UN USUARIO SE FUE
        //NOTE 6 SE ANEXA to(personaBorrada.sala)
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salio`));
        
        //NOTE 2 SE DISPARARA CUANDO UN USUARIO SE SALE Y ENTRA AL CHAT
        //NOTE 6 SE ANEXA to(personaBorrada.sala) y getPersonasPorSala(personaBorrada.sala)
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));


    });

    //NOTE 4 MENSAJES PRIVADOS
    // ESCUCHANDO CUANDO SE EMITAN LOS MENSAJE PRIVADOS
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });

});

