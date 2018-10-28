/**
 * 
 */
var lista = [1,2,3,4,5,6,7,8,9];
lista.map(function(elem){
	console.log(elem);
});

//var lista = [1,2,3,4,5,6,7,8,9];
var elemPorElem = lista.map(function(elem){
	return elem * elem;
});
console.log(lista);
console.log(elemPorElem);

var listaObjetos = [
	{nombre: "Luis", edad: 26},
	{nombre: "Jose", edad: 16},
	{nombre: "Manuel", edad: 24},
	{nombre: "Toño", edad: 23}
];

var mayoresEdad = listaObjetos.map(function(elem){
	return elem.edad > 18;
});

var mayoresDeEdad = listaObjetos.filter(function(elem){
	return elem.edad > 18;
});

var mayoresDeEdad2 = listaObjetos.find(function(elem){
	return elem.edad > 18;
});

console.log(mayoresEdad);
console.log(mayoresDeEdad);
console.log(mayoresDeEdad2);

console.log("////////////////");

var tasks = [
	{name:"task 1", time: 20 },
	{name:"task 2", time: 30 },
	{name:"task 3", time: 240 },
	{name:"task 4", time: 26 },
	{name:"task 5", time: 201 }
];

//var taskMayor = tasks.filter(function(elem){
var taskMayor = tasks.find(function(elem){
	return elem.time >60;
})
console.log(taskMayor);

