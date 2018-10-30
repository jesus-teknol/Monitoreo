import React from 'react';
import logo from './img/LogoTaller.png'

////
class Home extends React.Component{
    constructor(){
        super();

    }

// <img className="card-img-top" src="https://picsum.photos/420/320?randomhttps://picsum.photos/420/320?random" alt="Card image cap"/>
    render(){
        var divStyle = {
            width:"30%",
            height:"30%"
          };
          
          
        return(
            <div>
                <h1>TALLER TEKNOL</h1>
                <img className="card-img-top" src={logo} alt="Card image cap" style={divStyle}/>
                
                </div>

        )};
}

export default Home;