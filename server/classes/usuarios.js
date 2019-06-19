//NOTE CREA TODOS LOS USUARIOS CONECTADOS
class Usuarios {
    
    constructor (){
        
        //NOTE INICIALIZO UN ARREGLO QUE ESE VACIO Y SEA UN ARREGLO
        this.personas = [];

    }
    //NOTE METODO DE AGREGAR PERSONAS
    //NOTE 5 SE AGREGA SALA
    agregarPersona ( id, nombre, sala ){

        //NOTE CREA UNA PERSONA
        let persona = { id, nombre, sala };
        
        //NOTE AGREGAR PERSONA AL ARREGLO
        this.personas.push(persona);

        //NOTE RETORNO TODO EL ARREGLO DE PERSONAS
        return this.personas;

    }

    //NOTE OBTENER UNA PERSONA POR "ID"
    getPersona( id ){

        //NOTE filter REGRESA
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;

    }

    //NOTE OBTENER TODAS LAS PERSONAS
    getPersonas(){

        return this.personas;

    }

    //NOTE 6 
    getPersonasPorSala (sala){
        let personasEnSala = this.personas.filter( persona => persona.sala === sala );
        return personasEnSala;
    }

    //NOTE ELIMINAR
    borrarPersona( id ){

        let personaBorrada = this.getPersona(id);
        
        //NOTE BORRO CON ESTA LINEA
        this.personas = this.personas.filter( persona => persona.id != id );

        return personaBorrada;

    }
}

//NOTE EXPORTO EL ARCHIVO
module.exports = {

    Usuarios

}