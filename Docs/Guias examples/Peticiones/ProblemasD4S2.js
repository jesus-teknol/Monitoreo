/**
 * 1. Hacer una funcion que haga una peticion(Ejemplo: peticionLibro(“i robot”);
 * http://openlibrary.org/search.json?q=i+robot) buscar un libro y traer el o 
 * los autores
 * 
 * 2. Hacer una petición por autor y devolver la lista de sus libros 
 * (http://openlibrary.org/search.json?author=asimov)
 * 
 * 3. Hacer una peticion a (http://www.theaudiodb.com/api/v1/json/1/search.php?s=muse) y 
 * devolver el género de la banda deseada
 * 
**/
/*
 * 1. Hacer una funcion que haga una peticion(Ejemplo: peticionLibro(“i robot”);
 * http://openlibrary.org/search.json?q=i+robot) buscar un libro y traer el o 
 * los autores
*/
////siempre
const request = require("request");
function getLibro(nameLibro){
    return new Promise((resolve,reject)=>{
        let libroname = nameLibro.split(" ");
        let searchlibro = libroname.join("+");
        request.get("http://openlibrary.org/search.json?q=" + searchlibro,(error,response,body)=>{
                    if (response.statusCode == 200){                        
                           let libro = JSON.parse(body);
                           let libroFound = libro.docs.find(function(elem){
                            return elem.title_suggest = nameLibro;
                           });
                           let msg = "title: " + libroFound.title_suggest + ", Autor: " 
                                    + libroFound.author_name;
                           resolve(msg);
                          
                       }else{
                           reject("Libro no encontrado");
                       }
                   });
    });
}
/////Applications of industrial robots in Japan, 1981 
//i robot
//Robocop
//getLibro("i robot")
//.then((libro)=>{
//  console.log(libro);
//})
//.catch((error)=>{
//  console.log(error);
//});
/**
* 2. Hacer una petición por autor y devolver la lista de sus libros 
* (http://openlibrary.org/search.json?author=asimov)
*/
//const request = require("request");
function getAutor(autorFind){
    return new Promise((resolve,reject)=>{
        let autorName = autorFind.split(" ");
        let searchAutor = autorName.join("+");
        request.get("http://openlibrary.org/search.json?author=" + searchAutor,(error,response,body)=>{
                    if (response.statusCode == 200){                        
                           let autor = JSON.parse(body);
                           //resolve(autor);
                           
                           let titlesFound = autor.docs.map(function(elem){
                            return elem.title_suggest;
                           });
                           resolve(titlesFound);
                          
                       }else{
                           reject("Libro no encontrado");
                       }
                   });
    });
}
//getAutor("asimov")
//.then((autor)=>{
//  let titlesFound = autor.forEach(function(elem,ix){
//      let index = ix +1; 
//      console.log("Titulo No. " + index + ": " + elem)
//  });
////    console.log(autor);
//})
//.catch((error)=>{
//  console.log(error);
//});
/**
* 3. Hacer una peticion a (http://www.theaudiodb.com/api/v1/json/1/search.php?s=muse) y 
     * devolver el género de la banda deseada
*/
function getAutor(bandaFind){
    return new Promise((resolve,reject)=>{
       // bandaFind=bandaFind.replace(" ","+");
    	let bandaName = bandaFind.split(" ");
        let searchBanda = bandaName.join("+");
        request.get("http://www.theaudiodb.com/api/v1/json/1/search.php?s=" + searchBanda,(error,response,body)=>{
                    if (response.statusCode == 200){                        
                           let banda = JSON.parse(body);
                           resolve(banda);                        
                       }else{
                           reject("Libro no encontrado");
                       }
                   });
    });
}
getAutor("muse")
.then((banda)=>{
    let search = banda.artists[0];
    console.log("Banda: " + search.strArtist+", Genero musical: " +search.strGenre);
})
.catch((error)=>{
    console.log(error);
});

