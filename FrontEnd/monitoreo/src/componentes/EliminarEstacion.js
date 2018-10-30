import React from 'react';
import Axios from 'axios';
//

class EliminarEstacion extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.getEstacionByClient(this.props.match.params.client);
    }



    getEstacionByClient= (findClient) =>{
        Axios.get('https://monitoreo-controladores.herokuapp.com/frontEnd/message/estaciones/'+ findClient)
        .then((success)=>{
            console.log(findClient);
            console.log(success);
            console.log(success.data._id);
            let estacion = success.data;
            /*this.setState({
                tpr: estacion.TPR,
                adj_R1: estacion.adj_R1,
                adj_R2: estacion.adj_R2,
                controlStatus:estacion.controlStatus,
                controlWord: estacion.controlWord,
                temp_max: estacion.temp_max,
                temp_min: estacion.temp_min,
                id: estacion._id
            })*/
         })
        .catch((error)=>{
            console.log(error);
            alert(error);
        })
     
    }

render(){
    return(
        <div>Hola Eliminar</div>
        )

    }

}

export default EliminarEstacion;