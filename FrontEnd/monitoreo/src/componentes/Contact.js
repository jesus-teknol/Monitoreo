import React from 'react';
import YouTube from 'react-youtube';
import firmaTeknol from './img/Firma-Jashi2.jpg'

//Firma-Jashi2.jpeg


 
class About extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    var divStyle = {
        width:"55%",
        height:"20%"
      };
 
    return (
        <div>
       <h1>Contacto</h1>
       <img className="contact-brand" src={firmaTeknol} alt="Firma Teknol" style={divStyle}/>
        <br></br>
        <br></br>
      <YouTube
        videoId="jqgN1IdNoK4"
        opts={opts}
        onReady={this._onReady}
        
      />
      
      
      </div>
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default About;