// managerDB

// Se espera a que Cordova cargue

document.addEventListener("deviceready", onDeviceReady, false);

function errorCB(err) {
			alert("Error al procesar SQL: "+err.code);
        }
		
function queryReview(tx, results) {
var len = results.rows.length;
if (len==0){
alert("El usuario no se registró"); } 
else
{
	alert("Se registró el usuario");
	tx=null
	window.open("inicio.html");
	}
}
function queryDB(tx) {
tx.executeSql("SELECT * FROM usuario",[], queryReview, errorCB)
db.transaction(populaDB, errorCB);
}

function populaDB(tx) {
	alert("Entra a crear tablas!");
	tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,   nombre_usuario, edad, correo, terapeuta, correoT, password)');
}
				
function successCB() {
			
			var db = window.openDatabase("appSertividadDB", "1.0", "appSertividadDB", 100000);
			db.transaction(queryDB, errorCB);
			}
		
function insertaDB(tx) {
//Se intenta crear el usuario"

tx.executeSql('INSERT INTO usuario (nombre_usuario, edad,  correo, terapeuta, correoT, password) VALUES ("' +document.getElementById("txtNombre").value+'", "' +document.getElementById("txtEdad").value+'", "' +document.getElementById("txtEmail").value+'", "' +document.getElementById("txtTerapeuta").value+'", "' +document.getElementById("txtEmailT").value+'", "'+document.getElementById("txtPassword").value+'")');
tx.executeSql('SELECT * FROM usuario', [], queryReview, errorCB);
}


function onDeviceReady() {
//Dispositivo listo"
			var db = window.openDatabase("appSertividadDB", "1.0", "appSertividadDB", 100000);
			db.transaction(populaDB, errorCB);
}




			
function queryUserSuccess(tx, results) {
	//entra a ver si hubo éxito
var len = results.rows.length;
if (len==0){
alert("El usuario no está registrado, agregue uno"); } 
else
{
	tx=null 
	window.open("inicio.html");
	
	}

}		
function searchQueryDB(tx) {

	tx.executeSql("SELECT * FROM usuario WHERE correo = '"+ document.getElementById('txtEmail').value + "' and password ='"+ document.getElementById('txtPassword').value + "'",[], queryUserSuccess, errorCB);
}

function goSearch() {
			//Entra a buscar al usuario
			var db = window.openDatabase("appSertividadDB", "1.0", "appSertividadDB", 100000);
			db.transaction(searchQueryDB, errorCB);
			}

function goInsert() {
alert("si entra a goInsert");

var db = window.openDatabase("appSertividadDB", "1.0", "appSertividadDB", 100000);
db.transaction(insertaDB, errorCB);
				
}