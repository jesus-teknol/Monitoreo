import React from 'react';
import axios from 'axios';
import Card from './Card'
import CardEmpty from './CardEmpty'
//////
class Estaciones extends React.Component{
    constructor(){
        super();
        this.state = {
            lista_estaciones:[]
        }
    }

componentWillMount(){
    //console.log("antes de cargar componente alumnos");
}
componentDidMount(){
   // console.log("despues de cargar componente alumnos");
    this.getEstaciones();
}

getEstaciones = () =>{
      axios.get('https://monitoreo-controladores.herokuapp.com/frontEnd/v1/estaciones/')
        .then((success)=>{
                console.log(success);
                this.setState({lista_estaciones : success.data});  
        })
        .catch((error)=>{
            console.log(error);
        })
}

updateEstacionesList = () =>{
    if(this.state.lista_estaciones == 0){
        return (
            <div class="alert alert-success alert-dismissible">
            <strong>Descargando!</strong> Espere un momento, aquiriendo información....
          </div>
        )
    }
    else{
        let cardsEstaciones = this.state.lista_estaciones.map((elem) =>{
            ///retornamos cards estudiantes
            //console.log(elem.data.length);
            if(elem.data.length>0){
            return <Card item={elem} getEstaciones={this.getEstaciones}/>
         }
            else{
               return <CardEmpty item={elem} getEstaciones={this.getEstaciones}/>
            }
        });
        
        return cardsEstaciones;
    }
}
    render(){
        return(
            <div>
                <h1>Estaciones</h1>
                <div className='row'> 
                {this.updateEstacionesList()}
                </div>
            </div>
        );
    }
}

export default Estaciones;