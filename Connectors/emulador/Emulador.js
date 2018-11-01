const request = require("request");

/////User Info
const idMsg      = "5bd9185ae3c7ce00151ce929"; 
const idData     = "5bd9185ae3c7ce00151ce92a";
const client     = "client5"
/////Server API CONNECTION
const apiServer  = "https://monitoreo-controladores.herokuapp.com/";
const urlGetMsg  = apiServer + "frontEnd/message/estaciones/" + client;
const urlPutMsg  = apiServer + "frontEnd/message/estaciones/" + idMsg;
const urlGetData = apiServer + "api/v1/dataClientMsg/" + client;
const urlPutData = apiServer + "api/v1/dataClientMsg/" + idData;

var dataCont = {
        dht1_temp: 38,
        dht1_hmd: 30,
        dht2_temp: 30,
        dht2_hmd: 16,
        tr1_temp: 10,
        tr2_temp: 12,
        core_temp: 11,
        ac_state: 0,
        sec_remain: 0,
        temp_max: 0,
        temp_min: 0,
        adj_R1: 0,
        adj_R2: 0,
        TPR: 0
    };

var msgReg = {
    controlWord: "",
    temp_max: 40,
    temp_min: 30,
    adj_R1: 20,
    adj_R2: 14,
    TPR: 5,
    controlStatus: 0
};

function getMsg(url){
	return new Promise((resolve,reject)=>{
		request.get(url,(error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   var message = JSON.parse(body);
		                   resolve(message);
		                  
		               }else{
		                   reject("Cliente no encontrado");
		               }
		           });
	});
}

function putMsg(url,bodyMsg){
	return new Promise((resolve,reject)=>{
		request.put({url,body:bodyMsg,json:true},(error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   //var message = JSON.parse(body);
		                   resolve("ok");
		                  
		               }else{
		                   reject("Cliente no encontrado");
		               }
		           });
	});
}

////////////////////////////////////Datos////////////////////////////////////
function getData(url){
	return new Promise((resolve,reject)=>{
		request.get(url,(error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   var message = JSON.parse(body);
		                   resolve(message);
		                  
		               }else{
		                   reject("Cliente no encontrado");
		               }
		           });
	});
}

function putData(url,bodyData){
	return new Promise((resolve,reject)=>{
		request.put({url,body:bodyData,json:true},(error,response,body)=>{
		            if (response.statusCode == 200){		                
		                   //var message = JSON.parse(body);
		                   resolve("ok");
		                  
		               }else{
		                   reject("Cliente no encontrado");
		               }
		           });
	});
}
////////////////////////// FIN DATOS//////////////////
////////////////////////// Funcion RANDOM /////////////
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }



///////////////MENSAJERIA  

getMsg(urlGetMsg)
.then((msgGet)=>{
	console.log("Mensaje Recibido");
    console.log(msgGet);
    if(msgGet.controlWord != ""){
        ///funcion para cambiar datos en sistema
        ///volver a poner a cero con put controlStatus
        // console.log("Cambios");
        msgReg.controlWord = "";
        console.log(msgReg);
        /////Aqui poner función envió puerto serial
        putMsg(urlPutMsg,msgReg)
        .then((msgPut)=>{
            console.log("///////////////Put//////////");
            console.log(msgPut);
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }
     console.log("Msg ok");
     
})
.catch((error)=>{
	console.log(error);
});
/////////////////////////FIN MENSAJERIA

/////////////////////////Controlador a API Update de datos /////////////

getData(urlGetData)
.then((dataGet)=>{
	console.log("Data Recibida");
    console.log(dataGet);
    
    if(dataGet.data.length > 100 ){
        dataGet.data.reverse();
        dataGet.data.pop();
        dataGet.data.reverse();
    }
    let data2 = {data:[]};
    ////elimina _id de cada registro
    dataGet.data.forEach((elem) => {
        console.log(elem);
        delete elem._id;
    })
    //se genera un valor aleatorio para las mediciones
        dataCont.dht1_temp = getRandomInt(33, 40);
        dataCont.dht1_hmd= getRandomInt(33, 40);
        dataCont.dht2_temp= getRandomInt(33, 40);
        dataCont.dht2_hmd= getRandomInt(33, 40);
        dataCont.tr1_temp= getRandomInt(33, 40);
        dataCont.tr2_temp= getRandomInt(33, 40);
         ///se inserta el registro mas reciente
        dataGet.data.push(dataCont); 
        data2.data = dataGet.data;
        ///se pasa el arreglo data a el objeto data2 que contiene solo data
        putData(urlPutData,data2)
            .then((dataPut)=>{
                console.log("///////////////Put//////////");
                console.log(dataPut);
        })
            .catch((error)=>{
	            console.log(error);
        });


    })
.catch((error)=>{
    	console.log(error);
    });

