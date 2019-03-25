	
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const bodyParser = require('body-parser');

const servicioLogin = require('./servicios/login');


const directorioPublico = path.join(__dirname ,'../public');
const directorioPartials = path.join(__dirname ,'../partials');
const directorioHelpers = path.join(__dirname ,'../helpers');


app.use(bodyParser.urlencoded({extended : false}));


app.use(express.static(directorioPublico));

hbs.registerPartials(directorioPartials);
//hbs.registerHelpers(directorioHelpers);


app.set('view engine', 'hbs');


app.get('/', (req,res) => {
	res.render('index',{
		nombre : 'beta'
	});
});
 

app.get('/login', (req,res) => {

	res.render('login');
}); 

app.post('/auth', (req,res) => {
	let auth = servicioLogin.login(req.body.nombre,req.body.pass);
	if(auth)
		pagina = 'index';
	else
		pagina = 'login';
	res.render(pagina);
}); 


app.get('*', (req,res) => {
	res.render('index',{
		nombre : 'beta'
	});
});
 
app.listen(3000);