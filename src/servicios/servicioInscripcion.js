const fs = require('fs');
listaInscripciones = [];

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



//
 const inscribirseCurso = (nombreuser,nombrecurso) => {
    listar();
    let msg;
    let inscr = {
    id: nombreuser,	  
    nombre: nombrecurso    //datos que quedan dentro del objeto est	  	  
    };
// parabuscar los duplicados la llave sera el id	 
   //let duplicado = listaInscripciones.find(identi => identi.id == inscripcio.id); 
   //if (!duplicado){
    listaInscripciones.push(inscr);  // almacenar el objeto dentro del  vector lista cursos
    msg = 'inscripcion exitosamente!!!';
    guardar(); // guarda lo q esta en lista cursos dentro de datos  - esos datos en el archivo
  // }
  // else
  //    msg = 'y//////////////////////';


  return msg;
}



module.exports = {inscribirseCurso};