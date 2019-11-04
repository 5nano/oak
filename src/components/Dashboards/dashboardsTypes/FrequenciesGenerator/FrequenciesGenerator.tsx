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


const freqComponentGenerator = (color, name) => class YellowFreqComponent extends React.Component<YellowFreqComponentProps, YellowFreqComponentState> {


  constructor(props:YellowFreqComponentProps){
    super(props);
  }
  
  static fetchData(assayId: string) {
    return BushService.get(`/frecuencias/${color}?assayId=${assayId}`)
  }

  render(){
    if (!(this.props.data && Object.keys(this.props.data).length)) return this.props.onEmptyRender();
    return (
        <div className="PlotlyGraph YellowFreq">
          <BoxPlot data={this.props.data} dataSuffix="Hz" title={name} graphPosition={this.props.graphPosition} />
        </div>
    );
  }
};

const frequencyGenerator : ((freqColor: string, name: string) => DashboardType) = (freqColor, name) => ({
  id: `${freqColor}-frequency`,
  name,
  component: freqComponentGenerator(freqColor, name),
});

export default frequencyGenerator;
