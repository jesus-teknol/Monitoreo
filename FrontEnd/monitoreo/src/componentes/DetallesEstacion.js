import React from 'react';
import Axios from 'axios';
import ReactDOM from "react-dom";
import Chart from "react-google-charts";


////["Day", "Exterior", "Interior", "Touch"],
const data = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540]
  ];
  const options = {
    title: "Mediciones",
    curveType: "function",
    legend: { position: "bottom" }
  };

//////
class DetallesEstacion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            client:this.props.match.params.client,
            data:[]
        }
        this.getEstacionByClient(this.state.client);
    }

    getEstacionByClient= (findClient) =>{
        Axios.get('https://monitoreo-controladores.herokuapp.com/api/v1/dataClientMsg/'+ findClient)
        .then((success)=>{
            console.log(findClient);
            console.log(success);
            console.log(success.data.data);
            this.setState({
                data:success.data.data
            });
            console.log(this.state.data);

            // console.log(success.data._id);
            // let estacion = success.data;
            // this.setState({
            //     tpr: estacion.TPR,
            //     adj_R1: estacion.adj_R1,
            //     adj_R2: estacion.adj_R2,
            //     controlStatus:estacion.controlStatus,
            //     controlWord: estacion.controlWord,
            //     temp_max: estacion.temp_max,
            //     temp_min: estacion.temp_min,
            //     id: estacion._id
            // })
         })
        .catch((error)=>{
            console.log(error);
            alert(error);
        })
    }

    render() {
        //console.log(data);
        //console.log(this.state.client)
        let dataGraph = this.state.data;
       // console.log(dataGraph);
        let label = [ "Sample" , "Temp_ext"];
        let datatest= dataGraph.map((elem,id)=>{
            return ([id, elem.dht1_temp]);
        }) 
        console.log(label);
        console.log(datatest);
     
        return (
            <div className="App">
                <ui class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Selección
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Temperatura, %HR Exterior</a>
                        <a class="dropdown-item" href="#">Temperatura, %HR Interior</a> 
                        <a class="dropdown-item" href="#">Temperatura, Touch, Pantalla</a> 
                    </div>
                    </ui>

                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={[label, ...datatest]}
                    options={options}
                />
            </div>
        );
    }
}

export default DetallesEstacion;