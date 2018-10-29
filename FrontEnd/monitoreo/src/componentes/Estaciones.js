import React from 'react';
import axios from 'axios';
import Card from './Card'

class Estaciones extends React.Component{
    constructor(){
        super();
        this.state = {
            lista_alumnos:[]
        }
    }

componentWillMount(){
    console.log("antes de cargar componente alumnos");
}
componentDidMount(){
    console.log("despues de cargar componente alumnos");
    this.getAlumnos();
}

getAlumnos = () =>{
    ///petición a la api (GET)
    /// npm install axios --save (libreria que permite hacer peticiones con promesas)
    axios.get('https://app-alumnos-backended.herokuapp.com/api/v1/alumnos/')
        .then((success)=>{
                console.log(success.data);
                this.setState({lista_alumnos : success.data});  
        })
        .catch((error)=>{
            console.log(error);
        })
}

updateAlumnosList = () =>{
    if(this.state.lista_alumnos == 0){
        return <h1>Cargando...</h1>
    }
    else{
        let cardsAlumnos = this.state.lista_alumnos.map((elem) =>{
            ///retornamos cards estudiantes
            return <Card item={elem} getAlumnos ={this.getAlumnos}/>
        });
        return cardsAlumnos;
    }
}
    render(){
        return(
            <div>
                <h1>Alumnos</h1>
                <div className='row'> 
                {this.updateAlumnosList()}
                </div>
            </div>
        );
    }
}

export default Estaciones;