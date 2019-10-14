import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../../../services/bush';
import BoxPlot from '../../components/BoxPlot/BoxPlot';
import mockedYellowVal from './mockedYellowFreqVal';

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
  graphPosition?: 'left' | 'right', 
}

const name = "Mediana de frecuencias en amarillo";

class YellowFreqComponent extends React.Component<YellowFreqComponentProps, YellowFreqComponentState> {


  constructor(props:YellowFreqComponentProps){
    super(props)
  }
  
  static fetchData(assayId: string) {
    const freqType = 'yellow'; // Por ahora solo ofrecemos frecuencia amarilla
    return BushService.get(`/frecuencias/${freqType}?assayId=${assayId}`)
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
    const mockedValues = {
      "13-10-2019": {
        2: mockedYellowVal,
        89: mockedYellowVal
      },
      "15-10-2019": {
        2: mockedYellowVal,
        89: mockedYellowVal
      },
      "16-10-2019": {
        2: mockedYellowVal,
      }
    }

    return (
        <div className="PlotlyGraph YellowFreq">
          <BoxPlot data={mockedValues} dataSuffix="mm^2" title={name} graphPosition={this.props.graphPosition} />
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
