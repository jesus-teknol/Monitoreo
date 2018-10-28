/**
 * 1.Escribe una función que tome una cadena de palabras en mayúsculas 
   y la regrese en minúsculas.
        Entrada: [“hola”,”como”,”estas”]
        Salida: [“HOLA”,”COMO”,”ESTAS”]

2.Crea una funcion que reciba como parametro una cadena de palabras y 
  devuelva la cadena de caracteres modificadas en mayusculas y 
  minusculas.

        Entrada:[“Hola amigos”, “cinta roja cdmx y gdl”,” yei” ]
        Salida:[“HOLA amigos”, “CINTA roja CDMX y GDL”,”YEI”]

3. Hacer un arreglo de 4 cantidades de tiempo en minutos 
[120, 80, 200, 100], y agarrar sólo las que son mayores a 
dos horas (hacer la comparación en horas)

4.- A partir de esta lista [1, 3, 5, 7, 9], multiplicar todos los 
elementos por 7, y después sólo traer los que son menores a 30
 */

// 1.Escribe una función que tome una cadena de palabras en mayúsculas 
//  y la regrese en minúsculas.
//        Entrada: [“hola”,”como”,”estas”]
//        Salida: [“HOLA”,”COMO”,”ESTAS”]


var entradaE1 = ["hola","como","estas"];
var salidaE1 = entradaE1.map(function(elem){
	return elem.toUpperCase();
})

console.log("Ejercicio 1");
console.log(entradaE1);
console.log(salidaE1);
console.log("////////////////")


//2.Crea una funcion que reciba como parametro una cadena de palabras y 
//  devuelva la cadena de caracteres modificadas en mayusculas y 
//  minusculas.
//
//        Entrada:[“Hola amigos”, “cinta roja cdmx y gdl”,” yei” ]
//        Salida:[“HOLA amigos”, “CINTA roja CDMX y GDL”,”YEI”]

var entradaE2 = ["Hola amigos", "cinta roja cdmx y gdl","yei" ];

var alternar = (entradaTest) => {
	let myArrayT = entradaTest.split(" ");
	
	//console.log(myArrayT);
	let outPutArr = myArrayT.map(function(elemen,ix){
		if(ix%2 != 0){
			return elemen.toLowerCase();
		}
		else{
			return elemen.toUpperCase();
		}
	})
	//console.log("mi outPutArr " + outPutArr);
	return outPutArr.join(" ");
} 

var salidaE21 = alternar(entradaE2[0]);


var salidaE2 = entradaE2.map(function(elem){
	return alternar(elem);
});
console.log("Ejercicio 2");
console.log(entradaE2);
console.log(salidaE2);
console.log("////////////////////");

//3. Hacer un arreglo de 4 cantidades de tiempo en minutos 
//[120, 80, 200, 100], y agarrar sólo las que son mayores a 
//dos horas (hacer la comparación en horas)

var entradaE3 = [120, 80, 200, 100];
var salidaE3 = entradaE3.filter(function (elem){
	let minToHrs = elem / 60;
	if(minToHrs >= 2)
		return elem; 
})
console.log("Ejercicio 3");
console.log(entradaE3);
console.log(salidaE3);
console.log("////////////////////");

//4.- A partir de esta lista [1, 3, 5, 7, 9], multiplicar todos los 
//elementos por 7, y después sólo traer los que son menores a 30

var entradaE4 = [1, 3, 5, 7, 9];
var salidaE4 = entradaE4.filter(function(elem){
	let multiEnt = elem * 7;
	if(multiEnt < 30){
		return elem;
	}
})
console.log("Ejercicio 4");
console.log(entradaE4);
console.log(salidaE4);




