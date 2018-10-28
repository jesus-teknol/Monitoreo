/**
 * https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today
 * http://www.google.com
 */
//const request = require("request");
//var msg = "https://pokeapi.co/api/v2/pokemon/151/";
//var body2;
//request(msg, function(error,response,body){
//	//console.log(error);
//	//console.log(response);
//	console.log(body);
//	body2 = body;
//});
//
//console.log(body2);
///http.cat

//const request = require('request');
//
//request.get('http://pokeapi.co/api/v2/pokemon/151',
//           (error,response,body)=>{
//               console.log("Error: " + error);
//               console.log('Response ->', response.statusCode);
//
//            if (response.statusCode == 200){
//                   console.log("Peticion exitosa")
//                   var pokemon = JSON.parse(body)
//                   console.log(pokemon)
//                
//               }else{
//                   console.log("Pokemon no encontrado")
//               }
//           });


//https://swapi.co/api/people/1/
const request = require('request');

request.get('https://swapi.co/api/people/1/',
           function(error,response,body){
               console.log("Error: " + error);
               console.log('Response ->', response.statusCode);

            if (response.statusCode == 200){
                   console.log("Peticion exitosa")
                   var personaje = JSON.parse(body)
                   console.log(personaje)
                  
               }else{
                   console.log("Personaje no encontrado")
               }
           });
