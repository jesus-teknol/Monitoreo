import React from 'react';
import Axios from 'axios';

class EditarAlumno extends React.Component{
    constructor(props){
        super(props);
        console.log(props.match.params);
        this.state = {
            id: props.match.params.aid,
            nombre: '',
            apellido:'',
            edad:0
        }
        this.getAlumnoById(props.match.params.aid);
    }
    
    

    getAlumnoById= (id) =>{
        Axios.get('https://app-alumnos-backended.herokuapp.com/api/v1/alumnos/'+id)
        .then((success)=>{
            console.log(success);
            let alumno = success.data;
            this.setState({
                nombre:alumno.nombre,
                apellido: alumno.apellidos,
                edad:alumno.edad
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
        if(id == 'NombreRegistro'){
            this.setState({nombre: value});
        }
        else if(id == 'ApellidoRegistro'){
            this.setState({apellido:value});
        }else if(id == 'EdadRegistro'){
            this.setState({edad:value});
        }
    }

    onSubmit = (e)=>{
        e.preventDefault();
        if(this.state.nombre.length == 0 || this.state.apellido.length == 0 || this.state.edad <=18 ){
            alert(this.onSubmitError());
        }else{
        let jsonAlumnoNuevo = {
            nombre: this.state.nombre,
            apellidos: this.state.apellido,
            edad: this.state.edad
        }
        Axios.put('https://app-alumnos-backended.herokuapp.com/api/v1/alumnos/'+this.state.id,jsonAlumnoNuevo)
        .then((success)=>{
            console.log('Alumno Registrado ',success);
            alert('Alumno Editado');
            //this.setState({nombre:'',apellido:'',edad:0});
        })
        .catch((error)=>{
            console.log(error);
            alert(error);
        });
        }
    }

    render(){
        console.log(this.state);
        return(
            <div className='row'>
               <form className = 'col-md-4 offset-md-4' onSubmit={this.onSubmit}>
               <div className="form-group">
                   <label for="exampleInputEmail1">Nombre</label>
                   <input type="text" value = {this.state.nombre} className="form-control" id="NombreRegistro" aria-describedby="emailHelp" placeholder="Nombre" onChange={this.onInputChange}/>
                   <small id="emailHelp" className="form-text text-muted">Escribe tu nombre.</small>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Apellido</label>
                   <input type="text" value = {this.state.apellido} className="form-control" id="ApellidoRegistro" placeholder="Apellido" onChange={this.onInputChange}/>
               </div>
               <div className="form-group">
                   <label for="exampleInputPassword1">Edad</label>
                   <input type="number" value = {this.state.edad} className="form-control" id="EdadRegistro" placeholder="Edad" onChange={this.onInputChange}/>
               </div>
                   <button type="submit" className="btn btn-primary">Actualizar</button>
               </form>
           </div>
        )};
}

export default EditarAlumno;