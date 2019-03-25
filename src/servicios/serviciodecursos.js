const fs = require('fs');
listaCursos = []; // un vector que es el que vamos a llenar en Json, inicialmente vacio


 const listar = ()  => {
    try {	
	listaCursos = require('../../listacursos.json'); // TRAE (lee) EL LISTADO DE CURSOS EXISTENTE
	} catch {  // se va para aqui si el archivo buscado no existe
		listaCursos = []; 	
	}
 }


 const crear = (curso) => {
	  listar();
	  let cur = {
	  id: curso.id,	  
	  nombre: curso.nombre,    //datos que quedan dentro del objeto est
	  descripcion: curso.descripcion,
	  valor: curso.valor,
	  modalidad: curso.modalidad,
	  intensidad: curso.intensidad,
	  estado: curso.estado		  	  
	  };
// parabuscar los duplicados la llave sera el id	 
	 let duplicado = listaCursos.find(identi => identi.id == curso.id); 
	 if (!duplicado){
	  listaCursos.push(cur);  // almacenar el objeto dentro del  vector lista cursos
	  console.log(listaCursos);
	  guardar(); // guarda lo q esta en lista cursos dentro de datos  - esos datos en el archivo
	 }
	 else
		console.log('ya existe otro curso con ese nombre');
}


 const mostrar = ()  => {
	listar() // esto trae el archivo listado.json, solo falta imprimirlo en pantalla
	console.log ('CURSOS DISPONIBLES');

		return listaCursos;
}


const guardar = ()  => {
	let datos = JSON.stringify(listaCursos);        // guarda en string la variable lista cursos dentro de json
	fs.writeFile('listacursos.json', datos, (err)=>{
		     if (err) throw (err);
				console.log ('Archivo creado' );  // de lo contrario archivo creado con exito
	})
}

const mostrardetall = (ide)  => {
	listar() // esto trae el archivo listado.json, solo falta imprimirlo en pantalla
	let cur = listaCursos.find(buscar => buscar.id == ide); 
	 if (!cur){
			cur = 'no existe un curso con ese id';
	 }

	return cur;
}



	module.exports = {mostrar, crear, guardar, mostrardetall};

