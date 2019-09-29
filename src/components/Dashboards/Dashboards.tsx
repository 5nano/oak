import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";
import { render } from "node-sass";

export interface IDashboardsState{
  [experimentId: string]: {
    plotColor: string,
    values: Array<number>,
  },
}

export interface IDashboardProps {

}


class Dashboards extends React.Component<IDashboardProps, IDashboardsState> {


  constructor(props:IDashboardProps){
    super(props)

    this.state = {}

  }

  componentDidMount(){
    this.fetchFrequencies('yellow', 1, 'blue')
    this.fetchFrequencies('yellow', 1, 'red');
  }

  fetchFrequencies(freqType: string, experimentId: number, plotColor: string) {
    return fetch(`http://nanivo-bush.herokuapp.com/frecuencias/${freqType}?experimentId=${experimentId}`, {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseData => {
          function removeBackendMapping(data: any) {
            return Object.keys(responseData).map(backendFreqName => (responseData[backendFreqName]))[0]
          }

          const dataToSave = removeBackendMapping(responseData);
          this.setState({
            ...this.state,
            [freqType + plotColor]: {
              plotColor,
              values: dataToSave,
            },
          });
      })
  }

  render(){

      const data: Plotly.Data[] = Object.values(this.state).map(graph => ({
        x: graph.values,
        type: 'box',
        marker: {color: graph.plotColor}
      }))

      const layout: Partial<Layout> = {
        title: 'Mediana de frecuencias en amarillo',
        xaxis: {
          title: 'frecuencias'
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
