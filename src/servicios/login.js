

let login = (nombre, pass) => {
	return (nombre == 'admin' && pass == 'admin');
}


module.exports.login = login;