import React from 'react';
//import NavLink to Router 3
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <a className="navbar-brand" href="#">TEKNOL</a>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                   <ul className="navbar-nav mr-auto">
                       <li className="nav-item">
                           <NavLink className = "nav-link" to ='/' >Home</NavLink>
                           {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                       </li>
                       <li className="nav-item dropdown">
                               <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               Estaciones
                               </a>
                               <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                               <NavLink className = "dropdown-item" to = '/Estaciones/Lista'>Lista</NavLink>
                               <NavLink className="dropdown-item" to='/Estaciones/Registro'>Registro</NavLink>

                               </div>
                           </li>
                       <li className="nav-item">
                           <NavLink className = "nav-link" to = '/About'>About</NavLink>
                           {/* <a className="nav-link" href="#">About <span className="sr-only">(current)</span></a> */}
                       </li>
                       <li className="nav-item">
                            <NavLink className = "nav-link" to = '/Contact'>Contact</NavLink>
                           {/* <a className="nav-link" href="#">Contact <span className="sr-only">(current)</span></a> */}
                       </li>
                       
                   </ul>
                   <form className="form-inline my-2 my-lg-0">
                       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                       </input>
                       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                   </form>
               </div>
           </nav>
            </div>
        );
    }
}

export default NavBar;
