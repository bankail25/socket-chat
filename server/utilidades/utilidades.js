//SECTION 3 ENVIANDO UN MENSAJE A TODO EL GRUPO "SE CREA UNA CARPETA DENTRO DE SERVER "UTILIDADES""
// se crea una FUNCION QUE ENVIE 

const crearMensaje = ( nombre, mensaje ) => {

    return{
        nombre,
        mensaje,
        fecha: new Date().setMonth(11)
    };

}

module.exports = {
    crearMensaje
}