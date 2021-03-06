import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//
//import react-router-dom
import {BrowserRouter, Route, Switch} from 'react-router-dom';
///
///componentes
import Home from './componentes/Home';
import About from './componentes/About';
import Contact from './componentes/Contact';
import Error from './componentes/Error';
import NavBar from './componentes/NavBar';
import Estaciones from './componentes/Estaciones';
import EstacionReg from './componentes/EstacionReg';
import EditarEstacion from './componentes/EditarEstacion';
import DetallesEstacion from './componentes/DetallesEstacion';
import EliminarEstacion from './componentes/EliminarEstacion';
const Footer = ({title}) => (<footer>{title}</footer>);
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
                <Route path ="/Estaciones/Lista" component={Estaciones} exact />
                <Route path ="/Estaciones/Registro" component={EstacionReg} exact />
                <Route path ="/Estaciones/DetallesEstacion/:client" component={DetallesEstacion} exact />
                <Route path ="/Estaciones/EditarEstacion/:client" component={EditarEstacion} exact />
                <Route path ="/Estaciones/EliminarEstacion/:client" component={EliminarEstacion} exact />
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