/**

An open RESTful API for Pokémon data
2. Con la api de Star Wars (https://swapi.co/) realizar 3 funciones, usen su imaginación y creatividad, analicen los datos que devuelve la petición y muestren información en consola (nombre de los personajes, peliculas, naves espaciales, etc). (nota: pueden usar la promesa, pueden hacer una función que llame a otras).
Que tengan un excelente fin de semana, cuídense, descansen y nos vemos el lunes!
cualquier duda me dicen, gracias!
 */

//1. 
//PokéAPICon la api de Pokemon (https://pokeapi.co/) realizar 3 funciones, usen su imaginación y creatividad, 
//analicen los datos que devuelve la petición y muestren información en consola (nombre de los movimientos, 
//habilidades, etc). (nota: pueden usar la promesa, pueden hacer una función que llame a otras).
//pokeapi.co
//Arceus
//pikachu

//const request = new require("request");
//var pokemonNameFind = "rattata";
//
//function getPokemon(pokemonFind){
//	return new Promise((resolve,reject)=>{
//		let pokemonName = pokemonFind.split(" ");
//		let pokemonNameComplete = pokemonName.join("+");
//		request.get("https://pokeapi.co/api/v2/pokemon/" + pokemonNameComplete.toLowerCase() + "/",(error,response,body)=>{
//		            if (response.statusCode == 200){		                
//		                   let pokemonObj = JSON.parse(body);
//		                   resolve(pokemonObj);		                  
//		               }else{
//		                   reject("Pokemon no encontrado");
//		               }
//		           });
//	});
//}
//
//let imprimirHabilidades = (pokemonArg) =>{
//	let pokemonAbilities = pokemonArg.abilities.map(function(element){
//		return element.ability;
//	});
//	console.log("Puede tener "+pokemonAbilities.length+ " habilidades:");
//	pokemonAbilities.forEach(function(element,ix){
//		console.log((ix+1)+": Habilidaddes: " + element.name);
//	})
//}
//
//let imprimirMoves = (pokemonArg) =>{
//	let pokemonMoves = pokemonArg.moves.map(function(element){
//		return element.move;
//	});
//	console.log("Puede aprender " + pokemonMoves.length + " movimientos");
//	pokemonMoves.forEach(function(element,ix){
//		console.log((ix+1)+": Movimientos: " + element.name);
//	})
//}
//
//let imprimirVers = (pokemonArg) =>{
//	pokemonArg.forEach(function(eleme){
//		console.log("index " + eleme.game_index +" Version: "+eleme.version.name);
//	})
//
//}
//
//let imprimirForms = (pokemonArg,namePokemon) =>{
//	console.log("Las formas de este pokemon son: " + pokemonArg.length);
//	pokemonArg.forEach(function(eleme, ix){
//		console.log("Tipo " +eleme);
//	})
//
//}
//
//getPokemon(pokemonNameFind)
//.then((pokemon)=>{
//	let pokemonforms = pokemon.forms.map(function(element){
//		return element.name;
//	});
//	let pokemonindices = pokemon.game_indices.map(function(element){
//		return element;
//	});
//
//	
//    console.log("Este Pokemon aparece en " + pokemonindices.length + " versiones: " );
//    console.log("////////////////////////////////////////");
//    imprimirVers(pokemonindices,pokemonforms[0]);
//    console.log("////////////////////////////////////////");
//    imprimirForms(pokemonforms);
//    console.log("////////////////////////////////////////");
//	imprimirHabilidades(pokemon,pokemonforms[0]);
//	console.log("////////////////////////////////////////");
//	imprimirMoves(pokemon,pokemonforms[0]);
//	console.log("//---------------- EOF--------------------- //");
//})
//.catch((error)=>{
//	console.log(error);
//});

//2. Con la api de Star Wars (https://swapi.co/) realizar 3 funciones, usen su imaginación y creatividad, analicen los 
//datos que devuelve la petición y muestren información en consola (nombre de los personajes, peliculas, 
//naves espaciales, etc). (nota: pueden usar la promesa, pueden hacer una función que llame a otras).
//const request = new require("request");
const request = new require("request");

function getPersonaje(personajeFind,options){
	return new Promise((resolve,reject)=>{
		let personajeName = personajeFind.split(" ");
		let searchPersonaje = personajeName.join("+");
		if(personajeFind != ""){
			searchPersonaje +="/";
		}
		request.get(options + searchPersonaje,(error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   let pPersonaje = JSON.parse(body);
		                   //console.log(options+searchPersonaje);
		                  // console.log(pPersonaje);
		                   resolve(pPersonaje);		                  
		               }else{
		                   reject("No se encontro el Personaje");
		               }
		           });
	});
}

function getPersonajeHome(homePersonaje){
	return new Promise((resolve,reject)=>{
		request.get(homePersonaje,(error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   let pPersonaje = JSON.parse(body);
		                   resolve(pPersonaje);		                  
		               }else{
		                   reject("No se encontro el Personaje");
		               }
		           });
	});
}


var options = {
	    "films": "https://swapi.co/api/films/",
	    "people": "https://swapi.co/api/people/",
	    "planets": "https://swapi.co/api/planets/",
	    "species": "https://swapi.co/api/species/",
	    "starships": "https://swapi.co/api/starships/",
	    "vehicles": "https://swapi.co/api/vehicles/"
	};
/////////////Controles de Entrada  /////
///search = ""  :Busca lista de films, people, planets, species, starships, vehicles
///search = No. id   :Muestra un dato especifico ejemplo 1 option.people

let search =  "1";
var getOptions = options.people;

getPersonaje(search,getOptions)
.then((personaje)=>{
	//console.log(personaje);
	if(getOptions == options.films && search == ""){
		showListaFilms(personaje);
	}
	else if(search == ""){
		showListaNofilms(personaje,getOptions);
	}
	else if(search != "" && getOptions == options.people ){
		showPersonajeInfo(personaje);
	}
		
    //return personaje;
})
.catch((error)=>{
	return error;
});


function showPersonajeInfo(arg1){
	console.log("PERSONAJE SELECIONADO");
	console.log("Nombre: " + arg1.name);
	console.log("Estatura: " + arg1.height + " cm.");
	console.log("Genero: " + arg1.gender);
	console.log("Datos del Planeta");
	getPersonajeHome(arg1.homeworld)
	.then((home)=>{
		console.log("Lugar de Origen: " + home.name);
		console.log("Clima: " + home.terrain);
		console.log("Poblacion: " + home.population + " Habitantes");
	})
	.catch((error)=>{
		return error;
	})
	
}

////showListaVehiculos  ----Personajes ---planetas --- species --
function showListaNofilms(arg1,arg2){
	let info = arg1.results.map(function(elemen){
		return elemen.name;
	})
	console.log("Lista: ");
	console.log("ID  NAME");
   info.forEach(function(elem,id){
	   console.log((id+1) + " - " + elem ); 
   }) 
   
}
///
function showListaFilms(arg1){
	let info = arg1.results.map(function(elemen){
		return elemen.title;
	})
	console.log("Lista de Titulos");
	console.log("ID  Title Name");
   info.forEach(function(elem,id){
	   console.log((id+1) + " - " + elem ); 
   }) 
   
}

//result[] films
//result[] people
//result[] planets
//result[] species
//result[] starships
//result[] vehicles


