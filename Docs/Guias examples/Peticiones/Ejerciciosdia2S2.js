/**
 * Promesas y callback
 *1. Hacer las funciones necesarias (callbacks) para:
Pedir nombre completo y edad de una persona (como parametros) y mostraros.
Despues de mostrar los datos (nombre y edad), validar con la edad si es mayor 
y menor de edad (mostrar un mensaje, la validación debe ser resultado de otra función)
Despues de mostrar el mensaje de validacion de la edad, mostrar un mensaje de despedida 
con el nombre de la persona.

2. Hacer las funciones necesarias (callbacks) para:
Pedir dos numeros y realizar una suma
con el resultado debemos dividirlo entre 2
con el resultado de la division entre dos validamos 
si el numero es mayor a 0 y mostramos un mensaje de validación

*/

//
// *1. Hacer las funciones necesarias (callbacks) para:
//Pedir nombre completo y edad de una persona (como parametros) y mostraros.
//Despues de mostrar los datos (nombre y edad), validar con la edad si es mayor 
//y menor de edad (mostrar un mensaje, la validación debe ser resultado de otra función)
//Despues de mostrar el mensaje de validacion de la edad, mostrar un mensaje de despedida 
//con el nombre de la persona.

function datosPersona(nombre,edad,callback,callback2){
     console.log(nombre + " " + edad);
     callback(edad);
     callback2(nombre);
}

function validar(edad){
	if(edad > 18){
		console.log("Eres mayor de edad");
	}
	else{
		console.log("Eres menor de edad");
	}
}

function despedida(nombre){
	 console.log("Adios " + nombre);
}

datosPersona("jesus",38,validar,despedida);
console.log("///////////////////////////////////////");
//////////////////////////////////



//2. Hacer las funciones necesarias (callbacks) para:
//Pedir dos numeros y realizar una suma
//con el resultado debemos dividirlo entre 2
//con el resultado de la division entre dos validamos 
//si el numero es mayor a 0 y mostramos un mensaje de validación

function suma(a,b,callback1,callback2){
	let sumaAB = a + b;
	callback2(callback1(sumaAB));
}
function division1(arg1){
	return arg1 / 2;
}
function validation1(arg1){
	arg1 > 0 ? console.log("Mayor a Cero") : console.log("Menor a Cero");
}

suma(10,5,division1,validation1);
suma(-10,5,division1,validation1);