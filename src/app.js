	
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const bodyParser = require('body-parser');

const servicioUsuario = require('./servicios/servicioUsuario');
const servicioCursos = require('./servicios/serviciodecursos');


const directorioPublico = path.join(__dirname ,'../public');
const directorioPartials = path.join(__dirname ,'../partials');
const directorioHelpers = path.join(__dirname ,'../helpers');


app.use(bodyParser.urlencoded({extended : false}));


app.use(express.static(directorioPublico));

hbs.registerPartials(directorioPartials);
//hbs.registerHelpers(directorioHelpers);


app.set('view engine', 'hbs');



 

app.get('/login', (req,res) => {
	res.render('login');
}); 

app.post('/login', (req,res) => {
	let auth = servicioUsuario.login(req.body.id,req.body.pass);
	let mensajeError;
	if(auth){
		pagina = 'index';
	}
	else{
		pagina = 'login';
		mensajeError = 'Identificacion o clave incorrectos';
	}
	res.render(pagina, {
		errorMsg : mensajeError
	});
}); 


app.get('/crearUsuario', (req,res) => {
	res.render('crearUsuario');
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
		error : mensajeError
	});
}); 


app.get('/listar', (req,res) => {
	let listacursos = servicioCursos.mostrar();
	res.render('listarcursos',{
		listacursos : listacursos
	});
});

app.get('/crear', (req,res) => {
	res.render('crearcurso');
}); 

app.post('/ejecutacreacion', (req,res) => {
	let curso = {
		id: parseInt(req.body.id),		
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		valor: req.body.valor,					
		modalidad: req.body.modalidad,	
		intensidad: req.body.intensidad,	
		estado: req.body.estado	
	};
	let crearcurso = servicioCursos.crear(curso);	

	console.log(req.body);
	res.render('crearcurso',{
		id: parseInt(req.body.id),		
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		valor: req.body.valor,					
		modalidad: req.body.modalidad,	
		intensidad: req.body.intensidad,	
		estado: req.body.estado	,
		mensajeError : 'Se creo el Curso'
		});	

}); 

app.get('/detallecurso', (req,res) => {
	res.render('detallecurso',{
		ide : ide
	});
}); 


app.get('*', (req,res) => {
	res.render('login');
});
 
app.listen(3000, () => {
	console.log('-------------------------------------------------- \n \n La aplicación está escuchando en el puerto 3000 \n INGRESE A: http://127.0.0.1:3000/login \n \n -------------------------------------------------- \n ')	
});