import React from 'react';
import Axios from 'axios';
import ChartGauge from './ChartGauge'


class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            client: ""
        }
    }

    onEliminarEstacion = () =>{
        Axios.delete('https://app-alumnos-backended.herokuapp.com/api/v1/alumnos/'+this.props.item._id)
        .then((success) =>{
            console.log("alumno Eliminado");
            alert("Alumno Eliminado")
            this.props.getAlumnos();
        })
        .catch((error)=>{
            console.log(error);
            alert("Error", error);
        })
    }

    render(){
        
        console.log(this.props.item);
        let propsItems = this.props.item;
        let dataItems = propsItems.data;
        console.log(propsItems.client);
        this.state.client = propsItems.client;
        console.log(this.state.client);
        
        let actualdata={
            TPR: 0, ac_state:0,adj_R1: 0,
            adj_R2: 0, core_temp: 0, dht1_hmd: "0",
            dht1_temp: "0", dht2_hmd: 0,dht2_temp: 0,
            sec_remain: 0, temp_max: 0,temp_min: 0,
            tr1_temp: 0,tr2_temp: 0
        }; 
        if(dataItems.length > 0){
            actualdata =  dataItems[dataItems.length - 1];
            
            // console.log(actualdata);
            // console.log(propsItems.client)
            // console.log(actualdata.dht1_temp);
            //dht2_temp
        }
      //  <img className="card-img-top" src="https://picsum.photos/420/320?randomhttps://picsum.photos/420/320?random" alt="Card image cap"/>
        return(
            <div className="card col-3">
            
           
                <div className="card-body">
                
                    <h5 className="card-title">{propsItems.client.toUpperCase()}</h5>
                    <ChartGauge className="card-img-top" items = {actualdata} />
                    <p className="card-text">Exterior: {actualdata.dht1_temp}°C</p>
                    <p className="card-text">Exterior: {actualdata.dht1_hmd} % HR</p>
                    <p className="card-text">Interior: {actualdata.dht2_temp}°C</p>
                    <p className="card-text">Interior: {actualdata.dht2_hmd} % HR</p>
                    <p className="card-text">Pantalla: {actualdata.tr1_temp}°C</p>
                    <p className="card-text">Touch Screen: {actualdata.tr2_temp}°C</p>
                    
                    <a onClick={this.onEliminarAlumno} href="#" className="btn btn-danger">Eliminar</a>
                    <a href ={'/Estaciones/DetallesEstacion/' + this.props.item._id} className='btn btn-info'>Detalles</a>
                    <a href ={'/Estaciones/EditarEstacion/' + this.state.client} items = {this.state.client} className='btn btn-info'>Configurar</a>
                </div>
           </div>
                 );
               
    }
}

export default Card;