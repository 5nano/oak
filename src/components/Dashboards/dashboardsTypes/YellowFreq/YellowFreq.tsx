import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from "react-router"


export interface YellowFreqComponentState{
  assayId: string,
  experiments: Array<IFrontExperiment>,
  loading: boolean,
}
type AssayParamsType = {
  assayId: string,
}

export interface YellowFreqComponentProps extends RouteComponentProps<AssayParamsType> {
  onEmptyRender: Function
}

const name = "Mediana de frecuencias en amarillo";

class YellowFreqComponent extends React.Component<YellowFreqComponentProps, YellowFreqComponentState> {


  constructor(props:YellowFreqComponentProps){
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
            text: 'Experiment aIds',
            x: 0,
            xref: 'paper',

          }
        ],
        title: name,
        xaxis: {
          title: 'frecuencias'
        },
        autosize: false,
      };

    if (!loading && !(data && data.length)) return this.props.onEmptyRender();
    return (
        <div className="YellowFreq">
          <Plot
            data={data}
            layout={layout}
          />
        </div>
    );
  }
};

const yellowFreq : DashboardType = {
  id: 'yellow-frequency',
  name,
  component: withRouter(YellowFreqComponent),
};

export default yellowFreq;
