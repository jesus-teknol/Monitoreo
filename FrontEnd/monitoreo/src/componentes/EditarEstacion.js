import React from 'react';
import Axios from 'axios';
////configuración de parametros de operación desde MESSAGE 3
class EditarEstacion extends React.Component{
    constructor(props){
        super(props);
        
         this.state = {
              id: "",
              client:props.match.params.client,
              tpr: 0,
              adj_R1:0,
              adj_R2:0,
              controlStatus:0,
              controlWord:"",
              temp_max:40,
              temp_min:30
         }
        console.log(props);
        console.log(this.props.match.params.client);
      //   console.log(props.match.params);
         this.getEstacionByClient(props.match.params.client);
    }
    
    

    getEstacionByClient= (findClient) =>{
        Axios.get('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/'+ findClient)
        .then((success)=>{
            console.log(findClient);
            console.log(success);
            console.log(success.data._id);
            let estacion = success.data;
            this.setState({
                tpr: estacion.TPR,
                adj_R1: estacion.adj_R1,
                adj_R2: estacion.adj_R2,
                controlStatus:estacion.controlStatus,
                controlWord: estacion.controlWord,
                temp_max: estacion.temp_max,
                temp_min: estacion.temp_min,
                id: estacion._id
            })
         })
        .catch((error)=>{
            console.log(error);
            alert(error);
        })
     
    }

    onInputChange = (e) =>{
        console.log(e.target.id);
        console.log(e.target.value);
       // console.log(e.target.value.length);
       let id = e.target.id,
        value = e.target.value;
        if(id == 'temp_max'){
            this.setState({temp_max: value});
        }
        else if(id == 'temp_min'){
            this.setState({temp_min: value});
        }
        else if(id == 'adj_R1'){
            this.setState({adj_R1: value});
        }
        else if(id == 'adj_R2'){
            this.setState({adj_R2: value});
        }
        else if(id == 'tpr'){
            this.setState({tpr: value});
        }
    }

    onSubmit = (e)=>{
        e.preventDefault();
     
        if(this.state.temp_max < 35  
            || this.state.temp_max > 50  
            || this.state.temp_min > 35
            || this.state.min < 28  
            || this.state.adj_R1 < 0 
            || this.state.adj_R1 > 50
            || this.state.adj_R2 < 0 
            || this.state.adj_R2 > 50 
            || this.state.tpr < 0 
            || this.state.tpr > 50){
                alert("Revise sus parámetros");
            }else{
                let jsonEstacionConfig = {
                        TPR: this.state.tpr,
                        adj_R1: this.state.adj_R1,
                        adj_R2: this.state.adj_R2,
                        controlWord: "W",
                        temp_max: this.state.temp_max,
                        temp_min: this.state.temp_min,
        }
    
    
        Axios.put('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/'+this.state.id,jsonEstacionConfig)
        .then((success)=>{
            console.log('Cambios Registrados ',success);
            alert('Configuración Editada');
            //this.setState({nombre:'',apellido:'',edad:0});
        })
        .catch((error)=>{
            console.log(error);
            alert(error);
        });
    }
    }

    render(){
        //console.log(this.state.id);
        return(
            <div className='row'>
               
               <form className = 'col-md-4 offset-md-4' onSubmit={this.onSubmit}>
               <h1>Estación {this.state.client}</h1>
               <div className="form-group">
                   <label for="exampleInputEmail1">Temperatura Máxima</label>
                   <input type="number" value = {this.state.temp_max} className="form-control" id="temp_max" aria-describedby="emailHelp" placeholder="Temperatura Máxima" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Ajustes Max: 50°C  Min: 35°C</small>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Temperatura Mínima</label>
                   <input type="number" value = {this.state.temp_min} className="form-control" id="temp_min" placeholder="Temperatura Mínima" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Ajustes Max: 35°C  Min: 28°C</small>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Ajuste Temperatura Touch</label>
                   <input type="number" value = {this.state.adj_R1} className="form-control" id="adj_R1" placeholder="Ajuste Temp Touch" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Ajustes Max: 50  Min: 0</small>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Ajuste Temperatura Pantalla</label>
                   <input type="number" value = {this.state.adj_R2} className="form-control" id="adj_R2" placeholder="Ajuste Temp Pantalla" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Ajustes Max: 50  Min: 0</small>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Ajuste Punto Rocio</label>
                   <input type="number" value = {this.state.tpr} className="form-control" id="tpr" placeholder="Punto Rocio" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Ajustes Max: 50  Min: 0</small>
               </div>
                   <button type="submit" className="btn btn-primary">Actualizar</button>
               </form>
           </div>
        )};
}

export default EditarEstacion;