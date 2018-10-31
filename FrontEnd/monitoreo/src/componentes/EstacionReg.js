///terminado
import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
    /*
    client:String,
    controlWord:String,
    temp_max:Number, 
    temp_min:Number, 
    adj_R1:Number, 
    adj_R2:Number, 
    TPR:Number,
    controlStatus:Number 
    
*/
//

class EstacionReg extends React.Component{
    constructor(){
        super();
        this.state={
            client:"",
            controlWord:"",
            temp_max:40, 
            temp_min:30, 
            adj_R1:16, 
            adj_R2:16, 
            TPR:5,
            controlStatus:0,
            redirectPage:0,
            clientsData:[],
            clientsMsg:[]
           
        }
        this.getEstacionByClient();
    }

////////////////////////////******************** */
getEstacionByClient= () =>{
    let clientFoundedMsg;
    let clientFoundedData;
    Axios.get('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/')
    .then((success)=>{
        clientFoundedMsg = success.data.map((elem)=>{
            return elem.client;
        }); 
        this.setState({
            clientsMsg:clientFoundedMsg
        })
        console.log(clientFoundedMsg);       
     })
    .catch((error)=>{
        console.log(error);
        
    }) 
    Axios.get('https://monitoreo-controladores.herokuapp.com/frontEnd/v1/estaciones/')
    .then((success)=>{
            clientFoundedData = success.data.map((elem)=>{
                return elem.client;
            });
            this.setState({
                clientsData:clientFoundedData
            })
            console.log(clientFoundedData);
     })
    .catch((error)=>{
            console.log(error);
     })        
}
///////////////////////////**********************  */
    onInputChange = (e) =>{
        console.log(e.target.id);
        console.log(e.target.value);
       // console.log(e.target.value.length);
       let id = e.target.id,
        value = e.target.value;
                
        if(id == 'EstacionIdRegistro'){
            this.setState({client: value});
        }
        else if(id == 'TempMaxRegistro'){
            this.setState({temp_max: Number(value)});
        }else if(id == 'TempMinRegistro'){
            this.setState({temp_min: Number(value)});
        }
    }

    onSubmitError= () =>{
        let errorMsg = ['Error:'];
        let tempMaxValue = Number(this.state.temp_max),
            tempMinValue =Number(this.state.temp_min);
        if(this.state.client.length == 0){
            console.log("Client length " + this.state.client.length);
            errorMsg.push('Client ID incorrecto');
        }
        if(tempMaxValue < 35) {
            console.log("temp max: " + tempMaxValue);
            errorMsg.push('Temperatura Maxima Mayor 35');
        }
        if(tempMinValue > 35 ){
            console.log("temp min: " + tempMinValue);
            errorMsg.push('Temperatura Minima menor 35 grados');
        }
        if(tempMaxValue > 50) {
            console.log("temp max: " + tempMaxValue);
            errorMsg.push('Temperatura Maxima menor 50 grados');
        }
        if(tempMinValue < 28 ){
            console.log("temp min: " + tempMinValue);
            errorMsg.push('Temperatura Minima mayor 28 grados');
        }
        let msg = errorMsg.join(" ");
        return(msg);
    }
    //
    onSubmit = (e)=>{
        e.preventDefault();
        let tempMaxValue = Number(this.state.temp_max),
            tempMinValue =Number(this.state.temp_min);
            /////////////validacion cliente existente
            let clientSearchdata = this.state.clientsData;
            let clientSearchmsg = this.state.clientsMsg;
            let clientName =this.state.client;
            let clientStatus = 0
            this.setState({
                clientNoDisp:0
            })
            clientSearchdata.forEach((elem)=>{
                if(elem == clientName){
                    clientStatus = 1;
                }   
            });
            
            clientSearchdata.forEach((elem)=>{
                if(elem ==  clientName){
                    clientStatus = 1;
                }
            });
             
            console.log(clientName);
            console.log(clientStatus);
            console.log(clientSearchdata);
            console.log(clientSearchmsg);
           


        if(this.state.client.length == 0 
            || tempMaxValue < 35 
            || tempMaxValue > 50
            || tempMinValue < 28
            || tempMinValue > 35 ){
            alert(this.onSubmitError());
        }
        else if(clientStatus == 1){
            alert("Nombre de Estacion ID no Disponible");

        }
        else{
        let jsonEstacionNuevo = {
            client: this.state.client,
            controlWord:"",
            temp_max: Number(this.state.temp_max), 
            temp_min: Number(this.state.temp_min), 
            adj_R1:20, 
            adj_R2:14, 
            TPR:5,
            controlStatus:0
        }
        let validacion = 0;

        // https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/
        Axios.post('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/',jsonEstacionNuevo)
        .then((success)=>{
            console.log('Estacion Registrada ',success);
            this.setState({client:'',temp_max:40,temp_min:30});
        })
        .catch((error)=>{
            console.log(error);
            alert(error);
        });
        
        let jsonDatosNuevos = {
            client: this.state.client,
            data: []
        }
        // https://monitoreo-controladores.herokuapp.com/frontEnd/v1/estaciones/
        Axios.post('https://monitoreo-controladores.herokuapp.com/frontEnd/v1/estaciones/',jsonDatosNuevos)
        .then((success)=>{
            console.log('Estacion Registrada datos',success);
            alert("Registro Creado")
            this.setState({client:'',temp_max:40,temp_min:30});
        })
        .catch((error)=>{
            console.log(error);
            alert(error);
        });

        this.setState({
            redirectPage:1
        })
          
        clientSearchdata.push(clientName);
        clientSearchmsg.push(clientName);
        this.setState({
            clientsData:clientSearchdata,
            clientsMsg:clientSearchmsg
        })
        } 
        
    }
    
    upDateData = () =>{
        let actualdata = {
            redirectPage:this.state.redirectPage
        } 
        
        return actualdata;
    } 

//5bd661458867770015150fed  5bd661678867770015150fee
    render(){
        console.log(this.state);
      
        return(
            <div className='row'>
               <form className = 'col-md-4 offset-md-4' onSubmit={this.onSubmit}>
               <div className="form-group">
                   <label for="exampleInputEmail1">Estación ID</label>
                   <input type="text" value = {this.state.client} className="form-control" id="EstacionIdRegistro" aria-describedby="emailHelp" placeholder="Estacion ID" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Revice la lista de estaciones antes de realizar el registro.</small>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Temperatura Maxima</label>
                   <input type="number" value = {this.state.temp_max} className="form-control" id="TempMaxRegistro" placeholder="Temperatura Máxima" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Temperatura de Operación Max: 50°C Min: 35°C</small>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Temperatura Minima</label>
                   <input type="number" value = {this.state.temp_min} className="form-control" id="TempMinRegistro" placeholder="Temperatura Mínima" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Temperatura de Operación Min: 35°C Min: 28°C</small>
               </div>
                   <button type="submit" className="btn btn-primary">Registrar</button>
               </form>
           </div>
        )
    };
}

export default EstacionReg;