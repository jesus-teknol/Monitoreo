import React from 'react';
import Axios from 'axios';


class Card extends React.Component{
    constructor(props){
        super(props);
        
    }

    onEliminarAlumno = () =>{
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
        return(
            <div className="card col-3">
            <img className="card-img-top" src="https://picsum.photos/420/320?random
https://picsum.photos/420/320?random
" alt="Card image cap"/>
           <div className="card-body">
               <h5 className="card-title">{this.props.item.nombre}</h5>
               <p className="card-text">{this.props.item.edad}</p>
               <a onClick={this.onEliminarAlumno} href="#" className="btn btn-danger">Eliminar</a>
            <a href ={'/Alumnos/Editar/' + this.props.item._id} className='btn btn-info'>Actualizar</a>
           </div>
           </div>
                 );
    }
}

export default Card;