
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const bodyParser = require('body-parser');

const servicioUsuario = require('./servicios/servicioUsuario');
const servicioCursos = require('./servicios/serviciodecursos');
const servicioInscripcion = require('./servicios/servicioInscripcion');

const directorioPublico = path.join(__dirname ,'../public');
const directorioPartials = path.join(__dirname ,'../partials');
const directorioHelpers = path.join(__dirname ,'../helpers');


app.use(bodyParser.urlencoded({extended : false}));


app.use(express.static(directorioPublico));

hbs.registerPartials(directorioPartials);
//hbs.registerHelpers(directorioHelpers);


app.set('view engine', 'hbs');

//usuario global, compartido por diferentes sessiones
let auth = {};
 

app.get('/login', (req,res) => {
	res.render('login');
}); 

app.post('/login', (req,res) => {
    auth = servicioUsuario.login(req.body.id,req.body.pass);
    auth.isAdmin = auth.rol == 'coordinador';
	let mensajeError;
	if(auth){
		pagina = 'index';
	}
	else{
		pagina = 'login';
		mensajeError = 'Identificacion o clave incorrectos';
	}
	res.render(pagina, {
		errorMsg : mensajeError,
		auth : auth
	});
}); 


app.get('/crearUsuario', (req,res) => {
	let usuario = servicioUsuario.mostrardetall(req.query.id);
	res.render('crearUsuario', {
		usuario : usuario,
		auth : auth
	});
}); 

app.post('/crearUsuario', (req,res) => {
	let mensajeError = servicioUsuario.crear(req.body.id,req.body.nombre,req.body.correo,req.body.telefono, req.body.clave);	
	if(mensajeError){
		pagina = 'crearUsuario';
	}
	else{
		pagina = 'login';
	}

	res.render(pagina, {
		error : mensajeError,
		auth : auth
	});
}); 

app.post('/actualizarUsuario', (req,res) => {
	let mensajeError = servicioUsuario.actualizar(req.body.id,req.body.nombre,req.body.correo,req.body.telefono, req.body.rol);	
	if(mensajeError){
		pagina = 'crearUsuario';
			let usuario = servicioUsuario.mostrardetall(req.query.id);

		res.render(pagina, {
		usuario : usuario,
		error : mensajeError,
		auth : auth
	});
	}
	else{
		pagina = 'listarUsuarios';
		res.redirect(pagina);
	}

	
}); 


app.get('/listar', (req,res) => {
	let listacursos = servicioCursos.mostrardisponibles();
	res.render('listarcursos',{
		listacursos : listacursos,
		auth : auth
	});
});

app.get('/crear', (req,res) => {
	res.render('crearcurso', {
		auth : auth
	});
}); 

app.post('/crear', (req,res) => {
	let curso = {
		id: parseInt(req.body.id),		
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		valor: req.body.valor,					
		modalidad: req.body.modalidad,	
		intensidad: req.body.intensidad,	
		estado: req.body.estado	
	};

	let msg = servicioCursos.crear(curso);	

	//console.log(req.body);
	res.render('crearcurso',{
		id: parseInt(req.body.id),		
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		valor: req.body.valor,					
		modalidad: req.body.modalidad,	
		intensidad: req.body.intensidad,	
		estado: req.body.estado	,
		mensajeError : msg,
		auth : auth
		});	

}); 

app.get('/detallecurso', (req,res) => {
	let curso = servicioCursos.mostrardetall(req.query.id);
	res.render('detallecurso',{
		curso : curso,
		auth : auth
	});
}); 


app.get('/inscribirACurso', (req,res) => {
	let listacursos = servicioCursos.mostrardisponibles();	
	let listausuarios = servicioUsuario.mostrar();		
	res.render('inscribirseCurso',{
		listacursos : listacursos,
		listausuarios: listausuarios,
		auth : auth
	});
}); 

app.post('/inscribirACurso', (req,res) => {


	let msg = servicioInscripcion.inscribirseCurso(parseInt(req.body.nombreuser),parseInt(req.body.nombrecurso));	

	res.render('inscribirseCurso',{
		nombreuser: parseInt(req.body.nombreuser),		
		nombrecurso: req.body.nombrecurso,
		mensajeError : msg,
		auth : auth
		});		

});


app.get('/listarinscritos', (req,res) => {
	let listacursos = servicioCursos.mostrardisponibles();	
	let listausuarios = servicioUsuario.mostrar();
	let listainscritos = servicioInscripcion.mostrar();		
	let listainscritoslarge = servicioInscripcion.mostrarinscritos();
	res.render('listarinscritos',{
		listainscritoslarge : listainscritoslarge,
		auth : auth
	});
});


app.get('/desinscribiracurso', (req,res) => {
	let listacursos = servicioCursos.mostrardisponibles();	
	let listausuarios = servicioUsuario.mostrar();
	res.render('desinscribircurso',{
		listacursos : listacursos,
		listausuarios: listausuarios,
		auth : auth
	});
});


app.post('/desinscribiracurso', (req,res) => {


	let msg = servicioInscripcion.eliminar(parseInt(req.body.nombreuser),parseInt(req.body.nombrecurso));	

	res.render('desinscribircurso',{
		nombreuser: parseInt(req.body.nombreuser),		
		nombrecurso: req.body.nombrecurso,
		mensajeError : msg,
		auth : auth
		});		

});

app.get('/cerrarcurso', (req,res) => {
	let curso = servicioCursos.cerrarcurso(req.query.id);
	let listainscritoslarge = servicioInscripcion.mostrarinscritos();					
	res.render('listarinscritos',{
		listainscritoslarge : listainscritoslarge,
		auth : auth
	});
}); 


app.get('/eliminarinscripcion', (req,res) => {
	let eliminarinscripcion = servicioInscripcion.eliminar();
	let curso = servicioInscripcion.eliminar(req.query.iduser,req.query.idcurso);
	let listainscritoslarge = servicioInscripcion.mostrarinscritos();					
	res.render('listarinscritos',{
		listainscritoslarge : listainscritoslarge,
		auth : auth
	});
}); 

app.get('/listarmiscursos', (req,res) => {
	console.log('auth.id:'+auth.id)
	console.log('auth.nombre:'+auth.nombre)
	console.log('auth.role:'+auth.role)
	console.log('auth.isAdmin:'+auth.isAdmin)

	let listacursosusuario=servicioInscripcion.mostarmiscursos(auth.id);
	res.render('listarmiscursos',{
		listacursosusuario : listacursosusuario,
		auth : auth
	});
});


app.get('/listarUsuarios', (req,res) => {
	let listausuarios = servicioUsuario.mostrar();
	res.render('listaUsuarios',{
		listausuarios : listausuarios,
		auth : auth
	});
});
app.get('/eliminarmicurso', (req,res) => {
	let eliminarinscripcion = servicioInscripcion.eliminar();
	let curso = servicioInscripcion.eliminar(req.query.iduser,req.query.idcurso);
	let listacursosusuario=servicioInscripcion.mostarmiscursos(auth.id);					
	res.render('listarmiscursos',{
		listacursosusuario : listacursosusuario,
		auth : auth
	});
}); 

app.get('*', (req,res) => {
	res.render('login');
});
 
app.listen(3000, () => {
	console.log('-------------------------------------------------- \n \n La aplicación está escuchando en el puerto 3000 \n INGRESE A: http://127.0.0.1:3000/login \n \n -------------------------------------------------- \n ')	
});