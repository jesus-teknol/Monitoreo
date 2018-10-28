/**
 * Definimos tipo de datos Alumnos
 * seria el equivalente de una tabla
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnoSchema = new Schema({
	nombre: String,
	apellidos: String,
	edad: Number,
	email: String,
	ciudad: String
});

let Alumno = mongoose.model('alumno',alumnoSchema);
module.exports = Alumno;