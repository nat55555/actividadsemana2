const fs = require('fs');
listaInscripciones = [];

const servicioUsuario = require('./servicioUsuario');
const servicioCursos = require('./serviciodecursos');

const guardar = ()  => {
	let datos = JSON.stringify(listaInscripciones);        // guarda en string la variable lista cursos dentro de json
	fs.writeFile('inscripcionescurso.json', datos, (err)=>{
		     if (err) throw (err);
				console.log ('Archivo creado' );  // de lo contrario archivo creado con exito
	})
}


 const listar = ()  => {
    try {	
	listaInscripciones = require('../../inscripcionescurso.json'); // TRAE (lee) EL LISTADO DE CURSOS EXISTENTE
	} catch {  // se va para aqui si el archivo buscado no existe
		listaInscripciones = []; 	
	}
 }

 const mostrar = ()  => {
	listar() // esto trae el archivo listado.json, solo falta imprimirlo en pantalla

	return listaInscripciones;
}

//
 const inscribirseCurso = (iduser,idcurso) => {
    listar();
    let msg;
    let inscr = {
    };
    
    let existe = listaInscripciones.find(identi => identi.curso == idcurso); 
    
    if(existe){

        
        let usuarios = existe.usuarios.filter(ins => ins != iduser); 

            if (usuarios.length == existe.usuarios.length) {
                
                existe.usuarios.push(iduser);

                msg = 'inscripcion exitosamente!!!';
                guardar();

            } else {
                 
                 msg = 'usuario ya esta matriculado en ese curso, no se puede matricular de nuevo'
            
            }


    }else{
      inscr = {'curso' : idcurso  , 'usuarios' : [iduser]};
      listaInscripciones.push(inscr);
      msg = 'inscripcion exitosamente!!!';
      guardar();
    }

      
  return msg;
}



const mostrarinscritos = ()  => {
	listar() // esto trae el archivo listado.json, solo falta imprimirlo en pantalla
  let respuesta = [];
    let listacursos = servicioCursos.mostrardisponibles();	
    let listausuarios = servicioUsuario.mostrar();
    let nombreuno;

    listaInscripciones.forEach(inscripcion => {

        let fila = {};
        let nombreCurso = servicioCursos.mostrardetall(inscripcion.curso).nombre;
        let idCurso = servicioCursos.mostrardetall(inscripcion.curso).id;        
        let estadoCurso = servicioCursos.mostrardetall(inscripcion.curso).estado;

        let estudiantes = [];

        if (estadoCurso == 'disponible') {

         inscripcion.usuarios.forEach(estudiante =>{
           estu = servicioUsuario.mostrardetall(estudiante);
           estudiantes.push(estu);           
        });
        
        fila = {'idcurso' : idCurso ,'curso' : nombreCurso , 'inscrito' : estudiantes};
        
        respuesta.push(fila);

        } else {
            console.log ('el curso esta cerrado') ;
        }

        console.log (fila) ;
    
        });

        return respuesta;
       
}



const eliminar = (iduser,idcurso)  => {
  listar ()

   let cursoexiste = listaInscripciones.find(identi => identi.curso == idcurso);
   if(cursoexiste){

                    listaInscripciones =  listaInscripciones.filter(identi => identi.curso != idcurso);

                    let usuarios = cursoexiste.usuarios.filter(ins => ins != iduser); 


                              if (usuarios.length == cursoexiste.usuarios.length) {
                                         msg = 'el estudiante no estaba matriculado en ese curso';
                              }
                              else {

                                          cursoexiste.usuarios = usuarios;

                                          listaInscripciones.push(cursoexiste);

                                          guardar();

                                          msg = 'des-suscripción exitosa';

                              }
        

    }else{
          msg = 'no existen inscripciones para ese curso';
    }


return msg;

}   



module.exports = {inscribirseCurso, mostrar, mostrarinscritos,eliminar};