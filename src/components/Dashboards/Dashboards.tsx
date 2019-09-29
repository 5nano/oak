import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";
import { render } from "node-sass";
import { randomColor } from 'randomColor';

export interface IDashboardsState{
  experiments: Array<IFrontExperiment>
}

export interface IBackendExperiment {
  experimentId: string,
  values: Array<number>
}

export interface IFrontExperiment {
  experimentId: string,
  plotColor: string,
  values: Array<number>
}

export interface IDashboardProps {

}


class Dashboards extends React.Component<IDashboardProps, IDashboardsState> {


  constructor(props:IDashboardProps){
    super(props)

    this.state = {
      experiments: [],
    }
    this.fetchFrequencies('yellow', 1)
  }


  fetchFrequencies(freqType: string, assayId: number) {
    return fetch(`http://nanivo-bush.herokuapp.com/frecuencias/${freqType}?assayId=${assayId}`, {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseData => {
        const dataWithColors: (Array<IFrontExperiment>) = responseData.map((experiment: IBackendExperiment) => ({
          ...experiment,
          plotColor: randomColor(),
        }));

        console.log(responseData);
          this.setState({
            ...this.state,
            experiments: dataWithColors,
          });
      })
  }

  render(){

      const data: Plotly.Data[] = this.state.experiments.map(experiment => ({
        x: experiment.values,
        name: experiment.experimentId,
        type: 'box',
        marker: {color: experiment.plotColor}
      }))
      
      const layout: Partial<Layout> = {
        annotations: [
          {
            text: 'Experiment Ids',
            x: 0,
            xref: 'paper',

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
