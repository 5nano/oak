import * as React from "react";

import Plot from 'react-plotlyjs-ts';

import { Layout } from "plotly.js";


export interface IDashboardsState{
  assayId: string,
  experiments: Array<IFrontExperiment>,
  loading: boolean,
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
  match: {
    params: { assayId: string }
  }
}


class Dashboards extends React.Component<IDashboardProps, IDashboardsState> {


  constructor(props:IDashboardProps){
    super(props)

    this.state = {
      assayId: props.match.params.assayId,
      experiments: [],
      loading: true,
    }
    this.fetchFrequencies('yellow')
  }


  fetchFrequencies(freqType: string) {
    return fetch(`https://nanivo-bush.herokuapp.com/frecuencias/${freqType}?assayId=${this.state.assayId}`, {
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
          plotColor: "yellow",
        }));

        console.log(responseData);
          this.setState({
            ...this.state,
            experiments: dataWithColors,
            loading: false,
          });
      })
  }

  render(){
      const { loading } = this.state;

      if (loading) return null;
      
      const data: Plotly.Data[] = this.state.experiments.map(experiment => ({
        x: experiment.values,
        name: experiment.experimentId,
        type: 'box'
      }))

      const layout: Partial<Layout> = {
        annotations: [
          {
            text: 'Experiment Ids',
            x: 0,
            xref: 'paper',

          }
        ],
        title: 'Mediana de frecuencias en amarillo',
        xaxis: {
          title: 'frecuencias'
        },
      };
      
    return !loading && !(data && data.length) ? 
      <div className="no-data-yet">
          Aún no contamos con datos para este ensayo, comienza a sacar fotos
      </div> : (
      <Plot
        data={data}
        layout={layout}
      />
    );
  }
};

export default Dashboards;
