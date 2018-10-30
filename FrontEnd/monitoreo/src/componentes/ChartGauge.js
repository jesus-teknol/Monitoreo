import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
/*
 1//
*/
//
const options = {
  width: 200,
  height: 120,
  redFrom: 60,
  redTo: 100,
  yellowFrom: 40,
  yellowTo: 60,
  minorTicks: 5
};

const getRandomNumber = () => {
  return Math.random() * 100;
};

class ChartGauge extends React.Component {
   constructor(props){
     super(props);
     this.state ={
       dht2_temp: this.props.items.dht2_temp
     }
     console.log(props);
     console.log(this.state.dht2_temp);
    }
  
 state = {
    memory: 80
  };
  intervalID = null;


  getData = () => {
    return [
      ["Label", "Value"],
      ["Temp", this.state.memory]
    ];
  };

  componentWillUnmount() {
    if (this.intervalID === null) return;
    clearInterval(this.intervalID);
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState(state => {
        return {
          ...state,
          memory: this.state.dht2_temp
        };
      });
    }, 3000);
  }

  render() {
    // console.log(this.getData());
    /*
     
    */
    return (
      <div className = "container">
      <div className ="">
      <div className ="g1">
        <Chart
          chartType="Gauge"
          data={this.getData()}
          options={options}
        />
        </div>
        </div>
        </div>
    
    );
  }
}

export default ChartGauge;