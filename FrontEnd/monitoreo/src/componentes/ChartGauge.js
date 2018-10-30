import React from "react";
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const options = {
  width: 200,
  height: 120,
  redFrom: 90,
  redTo: 100,
  yellowFrom: 75,
  yellowTo: 90,
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
    networkSpeed: 1,
    memory: 80,
    cpu: 55
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
          networkSpeed: getRandomNumber(),
          cpu: getRandomNumber(),
          memory: this.state.dht2_temp
        };
      });
    }, 3000);
  }

  render() {
    // console.log(this.getData());
    /*
      width="100%"
      height="400px"
    */
    return (
      
        <Chart
          chartType="Gauge"
          data={this.getData()}
          options={options}
        />
    
    );
  }
}

export default ChartGauge;