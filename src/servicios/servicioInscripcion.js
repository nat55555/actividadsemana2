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
      existe.usuarios.push(iduser);
     // inscr = existe;
    }else{
      inscr = {'curso' : idcurso  , 'usuarios' : [iduser]};
      listaInscripciones.push(inscr);
    }

      

// parabuscar los duplicados la llave sera el id	 
  // let duplicado = listaInscripciones.find(identi => identi.id == inscripcio.id); 
   //if (!duplicado){
  //  listaInscripciones.push(inscr);  // almacenar el objeto dentro del  vector lista cursos
    msg = 'inscripcion exitosamente!!!';
    guardar(); // guarda lo q esta en lista cursos dentro de datos  - esos datos en el archivo
  // }
  // else
  //    msg = 'y//////////////////////';


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

        let estudiantes = [];

         inscripcion.usuarios.forEach(estudiante =>{
           estu = servicioUsuario.mostrardetall(estudiante);
           estudiantes.push(estu);
        });

        fila = {'curso' : nombreCurso , 'inscrito' : estudiantes};

        respuesta.push(fila);
        console.log (fila) ;
    

        });

        return respuesta;
       
}



module.exports = {inscribirseCurso, mostrar, mostrarinscritos};