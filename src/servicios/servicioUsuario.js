const fs = require('fs');
listaUsuario = []; // un vector que es el que vamos a llenar en Json, inicialmente vacio

let login = (id, clave) => {
	listar();
	let usuario = listaUsuario.find(identi => (identi.id == id  && identi.clave == clave) ); 
	return (usuario);
}



 const listar = ()  => {
    try {	
	listaUsuario = require('../../listausuarios.json'); // TRAE (lee) EL LISTADO DE USUARIOS EXISTENTE
	} catch {  // se va para aqui si el archivo buscado no existe
		let usuarioAdmin = {
	  id: '1',	  
	  nombre: 'admin',    //datos que quedan dentro del objeto est
	  correo: 'natacb@gmail.com',
	  telefono: 'telefono',
	  clave: 'admin',
	  rol: 'coordinador'	  	  
	  };
		listaUsuario = [usuarioAdmin]; 	
	}
 }

const crear = (id, nombre, correo, telefono, clave	) => {
	  listar();
	  let msg;


	  let usuarioDb = {
	  id: id,	  
	  nombre: nombre,    //datos que quedan dentro del objeto est
	  correo: correo,
	  telefono: telefono,
	  clave: clave,
	  rol: 'aspirante'	  	  
	  };

// parabuscar los duplicados la llave sera el id	 
	 let duplicado = listaUsuario.find(identi => identi.id == id); 
	 if (!duplicado){
	  listaUsuario.push(usuarioDb);  // almacenar el objeto dentro del  vector lista 
	  guardar(); // guarda lo q esta en lista dentro de datos  - esos datos en el archivo
	 }
	 else{
		msg = 'ya existe un usuario con esta identificacion';
		}

	return msg;
}


const guardar = ()  => {
	let datos = JSON.stringify(listaUsuario);        // guarda en string la variable lista cursos dentro de json
	fs.writeFile('listausuarios.json', datos, (err)=>{
		     if (err) throw (err);
				console.log ('Archivo guardado' );  // de lo contrario archivo creado con exito
	})
}

const mostrar = ()  => {
	listar() // esto trae el archivo listado.json, solo falta imprimirlo en pantalla

	return listaUsuario;
}

const mostrardetall = (ide)  => {
	listar() // esto trae el archivo listado.json, solo falta imprimirlo en pantalla
	let est = listaUsuario.find(buscar => buscar.id == ide); 
	 if (!est){
			est = 'no existe un usuario con ese id';
	 }

	return est;
}


module.exports = {login, crear,mostrar, mostrardetall};