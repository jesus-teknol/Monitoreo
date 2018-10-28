/**
 * 
 */
var express = require("express");
var app = express();
const mongoose = require("./mongooseClients");

////BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

///se selecciona el puerto donde esete trabajando o si no se usa el 3000
const PORT = process.env.PORT || 3000;
//////Utilizar modelo alumno
const Alumno = require('./alumnoModel') ///nombre archivo alumnos.js 

///READ  default navegadores
app.get('/',function(request,response){
	response.send("Petición tipo GET nodemon node.js JASHIMOTO");
});

///CRUD
///CREATE http://localhost/api/v1/alumnos/
app.post('/api/v1/alumnos/',(request,response)=>{
	const {nombre, apellidos, edad} = request.body;
	let nuevoAlumno = Alumno({
		nombre: nombre, 
		apellidos: apellidos, 
		edad: edad
	});
	nuevoAlumno.save((error,success)=>{
		if(error) throw error;
		response.status(201).send(success);
	});
});

///READ ALL
app.get('/api/v1/alumnos/',(request,response)=>{
	Alumno.find().exec()
	.then(success =>{ ///Success es == a la lista de alumnos encontrados
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});

///READ by ID
app.get('/api/v1/alumnos/:aid',(request,response)=>{
	let {aid} = request.params;
	Alumno.findById(aid).exec()
	.then(success =>{ ///Success es == a la lista de alumnos encontrados
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});

///UPDATE
app.put('/api/v1/alumnos/:aid',(request,response)=>{
	let {aid} = request.params;
	const {nombre,apellidos,edad,email,ciudad}=request.body;
	
	let updateAlumno = {
			nombre: nombre,
			apellidos:apellidos,
			edad: edad,
			email:email,
			ciudad:ciudad
	}
	Alumno.findByIdAndUpdate(aid,updateAlumno,{new : true}).exec()
	.then(success =>{ ///success = alumno editado
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});



////DELETE
app.delete('/api/v1/alumnos/:aid',(request,response)=>{
	let {aid} = request.params;
	Alumno.findByIdAndRemove(aid).exec()
	.then(success => {
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
		});
});


app.listen(PORT,function(){
	console.log("Escuchando por el puerto: 3000");
});
