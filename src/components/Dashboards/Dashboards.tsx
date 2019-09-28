import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";
import { render } from "node-sass";

export interface IDashboardsState{
  data: Array<Number>
}

class Dashboards extends React.Component<IDashboardsState> {


  constructor(props:any){
    super(props)

    this.state={
      data: []
    }

  }

  componentDidMount(){
    
      fetch('nanivo-bush.herokuapp.com/frecuencias/yellow?experimentId=1', {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }).then(response => {
            console.log(response)
            console.log(response.json())
            console.log(response.text())
            
            return response.json()
      }).then(responseData =>{

              console.log(responseData)
              this.setState({data:responseData})
      })
    }

  render(){

      const data: Plotly.Data[] = [
        {
        x: [1, 2, 3],
        type: 'box',
        marker: {color: 'red'},
      },
      {
      x: [1, 2, 3,6,8,3,4,1,2,6,7,8],
      type: 'box',
      marker: {color: 'blue'},
      }
      ]

      const layout: Partial<Layout> = {
        annotations: [
          {
            text: 'simple-annotation',
            x: 0,
            xref: 'paper',
            y: 0,
            yref: 'paper'
          }
        ],
        title: 'simple-example',
        xaxis: {
          title: 'time'
        },
      };
  
  return (
       <Plot
         data={data}
         layout={layout}
       />
     );
  }
};

export default Dashboards;
