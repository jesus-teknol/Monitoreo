import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
//

class CardEmpty extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            client: this.props.item.client,
            mId:"",
            dId: "",
            reloadPage:0
        }
        this.getEstacionByClient(this.state.client);
    }

    getEstacionByClient= (findClient) =>{
        Axios.get('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/'+ findClient)
        .then((success)=>{
               this.setState({
                mId: success.data._id,
            })
          //  console.log(this.state)
         })
        .catch((error)=>{
            console.log(error);
            alert(error);
            this.setState ={
                errorState:1
            }
        }) 
            Axios.get('https://monitoreo-controladores.herokuapp.com/api/v1/dataClientMsg/'+ findClient)
            .then((success)=>{
                this.setState({
                    dId:success.data._id
                    })
                //console.log(this.state)
                })
            .catch((error)=>{
                console.log(error);
                alert(error);
                })     
    }

    onEliminarConfig = () =>{
        this.onEliminarEstacion();
        this.setState({
            client:"",
            mId:"",
            dId:"",
            reloadPage:1
        });
        this.upDateData();
        console.log("Eliminar Estacion");
        
    }


    onEliminarEstacion = () =>{
        console.log(this.state);
        Axios.delete('https://monitoreo-controladores.herokuapp.com/frontEnd/v1/estaciones/'+this.state.dId)
        .then((success) =>{
           console.log("Registro Datos Eliminado")
        })
        .catch((error)=>{
            console.log(error);
            alert("Error", error);
        })
        Axios.delete('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/'+this.state.mId)
        .then((success) =>{
            console.log("Registro Mensajes Eliminado");
            alert("Registro Eliminado")
            
        })
        .catch((error)=>{
            console.log(error);
            alert("Error", error);
        })
        this.setState({
            reloadPage: 1
        })
    }

    upDateData = () =>{
        let actualdata = {
            client: this.state.client,
            mId:this.state.mId,
            dId:this.state.dId,
            reloadPage:this.state.reloadPage
        } 
        return actualdata;
    } 
  
    render(){
        let reloadPageCall = this.upDateData();
        console.log(reloadPageCall);
        if(reloadPageCall.reloadPage== 1){
            return (
            <Redirect push to="/Estaciones/Lista" />
            );
        }else{
        return(
            <div className="card col-3">
                <div className="card-body">                      
                    <h5 className="card-title">Estación: {this.state.client.toUpperCase()} </h5>
                    <p className="card-title">MSG ID: {this.state.mId} </p>
                    <p className="card-title">Data ID: {this.state.dId} </p>
                    <a onClick={this.onEliminarEstacion} href="#" className="btn btn-danger">Eliminar</a>                    
                </div>
           </div>
                 );
        }          
    }
}

export default CardEmpty;