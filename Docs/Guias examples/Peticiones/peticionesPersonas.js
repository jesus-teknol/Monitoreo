/**
 * 
 */
const request = require("request");

function getPersonaje(idPersonaje){
	return new Promise((resolve,reject)=>{
		request.get('https://swapi.co/api/people/'+idPersonaje,
		           (error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   var personaje = JSON.parse(body);
		                   resolve(personaje);
		                  
		               }else{
		                   reject("Personaje no encontrado");
		               }
		           });
	});
}

function getPelicula(url){
	return new Promise((resolve,reject)=>{
		request.get(url,(error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   var pelicula = JSON.parse(body);
		                   resolve(pelicula);
		                  
		               }else{
		                   reject("Pelicula no encontrado");
		               }
		           });
	});
}
//
//function getPelicula(url){
//	return new Promise((resolve,reject)=>{
//		request.get(url,(error,response,body)=>{
//			if(response.statusCodde == 200){
//				var pelicula = JSON.parse(body);
//				resolve(pelicula);
//			}else{
//				reject("Pelicula no encontrada");
//			}
//		});
//	});
//}

//getPersonaje(1)
//.then((personaje)=>{
//	console.log("Primer promesa resuelta");
//	console.log(personaje);
//	console.log("////////////////////////////");
//	console.log(personaje.name);
//	let film = personaje.films;
//	console.log(film);
//	let film2 = personaje.films[0];
//	/////////////////////////
//	getPelicula(film2)
//	.then((film)=>{
//		console.log("Segunda promesa resuelta");
//		console.log(film);
//		console.log("////////////////////////////");
//		///console.log(personaje.name);
//		//let film = personaje.films;
//		console.log(film);
//	})
//	.catch((error)=>{
//		console.log(error);
//	});
//	///////////////////////
//})
//.catch((error)=>{
//	console.log(error);
//});
//

getPelicula("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today")
.then((film)=>{
	console.log("Segunda promesa resuelta");
	console.log(film);
	console.log(film.status);
	console.log(film.results.sunrise);
	console.log(film.results.sunset);
})
.catch((error)=>{
	console.log(error);
});
