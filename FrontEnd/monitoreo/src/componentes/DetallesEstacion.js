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
            data:[],
            graphData:[ "Sample" , "Temp_Ext"],
            label:[]
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
            //////
            let dataGraphTemp = this.state.data;
            let datatest= dataGraphTemp.map((elem,id)=>{
                return ([id, elem.dht1_temp]);
            }) 
            let label1 = [ "Sample" , "Temp Exterior"];
            this.setState({
               graphData: datatest,
               label: label1
             })

            console.log(this.state.data);
         })
        .catch((error)=>{
            console.log(error);
            alert(error);
        })
    }

    onInputChange = (e) =>{
       console.log(e.target.id);
       let option = e.target.id;

       let dataGraphTemp = this.state.data;
       let datatest;
        let label1;
        
        if(option == "TempExt"){
        datatest= dataGraphTemp.map((elem,id)=>{
            return ([id, elem.dht1_temp]);
        }) 
        label1 = [ "Sample" , "Temp Exterior"];
       }
       else if(option == "TempInt") {
        datatest= dataGraphTemp.map((elem,id)=>{
            return ([id, elem.dht2_temp]);
        }) 
        label1 = [ "Sample" , "Temp Interior"];
       }
       else if(option == "TempPant") {
        datatest= dataGraphTemp.map((elem,id)=>{
            return ([id, elem.tr1_temp]);
        }) 
        label1 = [ "Sample" , "Temp Pantalla"];
       }
       else if(option == "TempTouch") {
        datatest= dataGraphTemp.map((elem,id)=>{
            return ([id, elem.tr2_temp]);
        }) 
        label1 = [ "Sample" , "Temp Touch"];
       }

       this.setState({
         graphData: datatest,
         label: label1
       })
        console.log(label1);
        console.log(datatest);
    }

    render() {
       let datatestOut = this.state.graphData;
       let labelOut = this.state.label;
       console.log(datatestOut);
       console.log(labelOut);
     
        return (
            <div className="App">
                <ui class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Selección
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" id = "TempExt" onClick = {this.onInputChange}>Temperatura Exterior</a>
                        <a class="dropdown-item" href="#" id= "TempInt" onClick = {this.onInputChange}>Temperatura Interior</a> 
                        <a class="dropdown-item" href="#" id="TempPant" onClick = {this.onInputChange}>Temperatura Pantalla</a> 
                        <a class="dropdown-item" href="#" id="TempTouch" onClick = {this.onInputChange}>Temperatura Touch</a> 
                    </div>
                    </ui>

                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={[labelOut, ...datatestOut]}
                    options={options}
                />
            </div>
        );
    }
}

export default DetallesEstacion;