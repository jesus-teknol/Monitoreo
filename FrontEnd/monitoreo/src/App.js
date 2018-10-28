import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import react-router-dom
import {BrowserRouter, Route, Switch} from 'react-router-dom';

///componentes
import Home from './componentes/Home';
import About from './componentes/About';
import Contact from './componentes/Contact';
import Error from './componentes/Error';
import NavBar from './componentes/NavBar';
import Alumnos from './componentes/Alumnos'
import AlumnoReg from './componentes/AlumnoReg'
import EditarAlumno from './componentes/EditarAlumno'
/////////////
class App extends Component {
  render() {
    return (
      <div className="App">     
        <BrowserRouter>
            <div>
              <NavBar />
              <Switch>
                <Route path ="/" component={Home} exact />
                <Route path ="/Alumnos/Lista" component={Alumnos} exact />
                <Route path ="/Alumnos/Registro" component={AlumnoReg} exact />
                <Route path ="/Alumnos/Editar/:aid" component={EditarAlumno} exact />
                <Route path ="/About" component={About} exact /> 
                <Route path ="/Contact" component={Contact} exact />  
                <Route component = {Error} />
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;