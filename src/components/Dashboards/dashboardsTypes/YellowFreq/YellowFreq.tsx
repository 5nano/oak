import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';


export interface YellowFreqComponentState{
  experiments: Array<IFrontExperiment>,
  loading: boolean,
}
type AssayParamsType = {
  assayId: string,
}

export interface YellowFreqComponentProps extends RouteComponentProps<AssayParamsType> {
  onEmptyRender: Function,
  data: Array<IFrontExperiment>,
}

const name = "Mediana de frecuencias en amarillo";

class YellowFreqComponent extends React.Component<YellowFreqComponentProps, YellowFreqComponentState> {


  constructor(props:YellowFreqComponentProps){
    super(props)
  }
  
  static fetchData(assayId: string) {
    const freqType = 'yellow'; // Por ahora solo ofrecemos frecuencia amarilla
    return fetch(`https://nanivo-bush.herokuapp.com/frecuencias/${freqType}?assayId=${assayId}`, {
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

        return dataWithColors;
      })
  }

  render(){
      if (!(this.props.data && this.props.data.length)) return null;
      const data: Plotly.Data[] = this.props.data.map(experiment => ({
        x: experiment.values,
        boxpoints: 'suspectedoutliers',
        name: experiment.experimentId,
        type: 'box'
      }))

      const layout: Partial<Layout> = {
        title: name,
        
        xaxis: {
          title: 'frecuencias',
          
        },
        yaxis: {
          tickprefix: "Experiment ",
        },
        autosize: true,
      };

    if (!(data && data.length)) return this.props.onEmptyRender();
    return (
        <div className="PlotlyGraph YellowFreq">
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
  component: YellowFreqComponent,
};

export default yellowFreq;
