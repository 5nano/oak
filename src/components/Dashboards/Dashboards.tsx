import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";
import { render } from "node-sass";

export interface IDashboardsState{
  data: {
    yellowFrequencies: Array<number>
  }
}

export interface IDashboardProps {

}

class Dashboards extends React.Component<IDashboardProps, IDashboardsState> {


  constructor(props:IDashboardProps){
    super(props)

    this.state = {
      data: {
        yellowFrequencies: [],
      }
    }

  }

  componentDidMount(){
      fetch('http://nanivo-bush.herokuapp.com/frecuencias/yellow?experimentId=1', {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(response => response.json())
        .then(responseData =>{
            this.setState({
              data: responseData
            });
        })
    }

  render(){
    debugger;
      const data: Plotly.Data[] = [
        {
        x: this.state.data.yellowFrequencies,
        type: 'box',
        marker: {color: 'red'},
      },
      {
      x: this.state.data.yellowFrequencies,
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
