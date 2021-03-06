import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';

////

class EliminarEstacion extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            client: this.props.match.params.client,
            mId:"",
            mAdj_R1:0,
            mAdj_R2:0,
            mControlStatus:null,
            mControlWord:"",
            mTemp_max:0,
            mTemp_min:0,
            dId:"",
            errorState:0
        }
        console.log(props);
        this.getEstacionByClient(this.props.match.params.client);
    }

    getEstacionByClient= (findClient) =>{
        Axios.get('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/'+ findClient)
        .then((success)=>{
               this.setState({
                mId: success.data._id,
                mAdj_R1: success.data.adj_R1,
                mAdj_R2: success.data.adj_R2,
                mControlStatus: success.data.controlStatus,
                mControlWord: success.data.controlWord,
                mTemp_max: success.data.temp_max,
                mTemp_min: success.data.temp_min,
                redirecLista:0
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
                console.log(this.state)
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
            redirecLista:0,
            redirecLista:1
        });
        this.upDateData();
        console.log("Eliminar Alumno");
        
    }
/////////Metodo Eliminar  this.state.mId  this.state.dId
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
            redirecLista:1
        });
    }
    upDateData = () =>{
        let actualdata = {
            client: this.state.client,
            mId:this.state.mId,
            dId:this.state.dId,
            redirecLista:this.state.redirecLista
        } 
        return actualdata;
    } 


    render(){
        let actualdata= this.upDateData();
        console.log(actualdata);
        if(actualdata.redirecLista== 1){
            return (
            <Redirect push to="/Estaciones/Lista" />
            );
        }else{
      return(

            <div className="eliminar col-12">
                <div className="eliminar-body">  
                    <div class="alert alert-danger alert-dismissible">                       
                            <strong>Atención!</strong> Se perderá toda la información de la estación seleccionada
                    </div>                  
                    <h5 className="eliminar-title">Estacion: {actualdata.client.toUpperCase()}</h5>
                    <p className="eliminar-text">MSG ID: {actualdata.mId}</p>
                    <p className="eliminar-text">Data ID: {actualdata.dId}</p>         
                    <a onClick={this.onEliminarConfig} href="#" className="btn btn-danger">Eliminar</a>
                    <a href ={'/Estaciones/Lista'} className='btn btn-info'>Cancelar</a>    
                </div>
           </div>
                 );
               
        }
    }

}

export default EliminarEstacion;