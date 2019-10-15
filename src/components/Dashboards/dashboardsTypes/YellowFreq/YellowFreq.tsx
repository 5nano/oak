import * as React from "react";

import Plot from 'react-plotly.js';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../../../services/bush';
import BoxPlot from '../../components/BoxPlot/BoxPlot';

export interface YellowFreqComponentState{
  experiments: Array<IFrontExperiment>,
  loading: boolean,
}
type AssayParamsType = {
  assayId: string,
}

export interface YellowFreqComponentProps extends RouteComponentProps<AssayParamsType> {
  onEmptyRender: Function,
  data: any,
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
  }

  render(){
    if (!(this.props.data && Object.keys(this.props.data).length)) return this.props.onEmptyRender();
    return (
        <div className="PlotlyGraph YellowFreq">
          <BoxPlot data={this.props.data} dataSuffix="mm^2" title={name} graphPosition={this.props.graphPosition} />
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
