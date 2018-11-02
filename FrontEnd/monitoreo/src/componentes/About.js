import React from 'react';
import YouTube from 'react-youtube';

//



class About extends React.Component {
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            },
        };
 //CTx2Vl8USI8

        return (
            <div>
                <h1>Información TEKNOL</h1>
                <h2>Quioscos</h2>
                        <YouTube
                            videoId="llESXJ0rP4g"
                            opts={opts}
                            onReady={this._onReady}
                        />
                <br></br>
                <h2>Pantallas</h2>
                        <YouTube
                            videoId="f4DJGaegsok"
                            opts={opts}
                            onReady={this._onReady}
                        />
                <br></br>
                <h2>Winview de Teknol</h2>
                        <YouTube
                            videoId="CTx2Vl8USI8"
                            opts={opts}
                            onReady={this._onReady}
                        />
                <br></br>
               
                <h2>Mas información en <a href = "Teknol.net">Teknol.net</a></h2>
                </div>
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}

export default About;