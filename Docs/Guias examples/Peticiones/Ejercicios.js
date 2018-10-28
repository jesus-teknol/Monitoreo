/**
 * Leer el nombre y sueldo de 8 empleados y mostrar el nombre y 
   sueldo del empleado que más gana.

 * Guardar en un array los 20 primeros números pares.
 
 * Hacer una funcion que calcule el tiempo necesario para que un 
   automóvil que se mueve con una velocidad de 73000 m/h recorra una 
   distancia de 120 km. (TIEMPO = d/v)
 
 * Crear una funcion que reciba como parametro una oración y 
   defina si es palindromo.
 */


class Empleados{
	constructor(nombre,sueldo){
		this.nombre = nombre;
		this.sueldo = sueldo;
	}
	getNombre(){
		return this.nombre;
	}
	setNombre(newNombre){
		this.nombre = newNombre;
	}
	getSueldo(){
		return this.sueldo;
	}
	setSueldo(newSueldo){
		this.sueldo=newSueldo;
	}
	
}

var empleadosArray = [];
var Jose8 = new Empleados("jose8",500);
var Jose1 = new Empleados("jose1",400);
var Jose2 = new Empleados("jose2",550);
var Jose3 = new Empleados("jose3",350);
var Jose4 = new Empleados("jose4",150);
var Jose5 = new Empleados("jose5",650);
var Jose6 = new Empleados("jose6",700);
var Jose7 = new Empleados("jose7",400);


empleadosArray.push(Jose1,Jose2,Jose3,Jose4,Jose5,Jose6,Jose7,Jose8);

var nombre="",sueldo = 0,msg1="";

empleadosArray.forEach(function(elemnt,ix,arr) {
	let valor = elemnt.getSueldo();
	if(valor > sueldo){
		sueldo = elemnt.getSueldo();
		nombre = elemnt.getNombre();
	    msg1 = (nombre + " es el que mas gana: " + sueldo);
	}	
});
console.log(msg1);

///
// Guardar en un array los 20 primeros números pares.
var array123 = [];
for(let inc = 0; inc <=20; inc+=2){
	array123.push(inc);
}
console.log("/////////");
console.log(array123);

console.log("/////////");
//* Hacer una funcion que calcule el tiempo necesario para que un 
//automóvil que se mueve con una velocidad de 73000 m/h recorra una 
//distancia de 120 km. (TIEMPO = d/v)

var recorrido = (vel,dist) =>{
	 vel /=1000;
	 return dist /vel;
}
var tiempoTotal = recorrido(73000,120);
console.log("tiempo de recorrido: " + tiempoTotal.toFixed(2) + " horas");
///////////////////////////////////
console.log("/////////");

// Crear una funcion que reciba como parametro una oración y 
//defina si es palindromo.
var palindromo = "Anula la luz azul a la Luna";
var nopalindromo = "Anula la luz azul Luna";

var funcPalindromo = (frase) =>{
	let fraseUpper = frase.toUpperCase();
	let fraseTemp1 = fraseUpper.split(" ");
	let fraseTemp2 = fraseTemp1.join("");
	let lengthFrase = fraseTemp2.length-1;
	let palindromoFound = 1;
	for(let i in fraseTemp2){
		if(fraseTemp2[i]!=fraseTemp2[lengthFrase-i]){
			palindromoFound = 0;
			break;
		}
	}
	if(palindromoFound == 0){
		console.log(frase+", "+"No es palindromo");
	}else{
		console.log(frase+", "+"Es palindromo");
	}	
	
	
}

funcPalindromo(palindromo);
console.log("////////");
funcPalindromo(nopalindromo);