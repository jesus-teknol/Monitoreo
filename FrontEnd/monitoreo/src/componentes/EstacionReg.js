///terminado
import React from 'react';
import Axios from 'axios';
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
            controlStatus:0
        }
    }


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
        let msg = errorMsg.join(" ");
        return(msg);
    }
    //
    onSubmit = (e)=>{
        e.preventDefault();
        let tempMaxValue = Number(this.state.temp_max),
            tempMinValue =Number(this.state.temp_min);
        if(this.state.client.length == 0 || tempMaxValue < 35 || tempMinValue > 35 ){
            alert(this.onSubmitError());
        }else{
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
        // https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/
        Axios.post('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/',jsonEstacionNuevo)
        .then((success)=>{
            console.log('Estacion Registrada ',success);
            alert('Estacion Registrada');
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
            alert('Tabla de Datos Creada');
            this.setState({client:'',temp_max:40,temp_min:30});
        })
        .catch((error)=>{
            console.log(error);
            alert(error);
        });
        } 
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
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Temperatura Minima</label>
                   <input type="number" value = {this.state.temp_min} className="form-control" id="TempMinRegistro" placeholder="Temperatura Mínima" onChange={this.onInputChange}/>
               </div>
                   <button type="submit" className="btn btn-primary">Registrar</button>
               </form>
           </div>
        )};
}

export default EstacionReg;