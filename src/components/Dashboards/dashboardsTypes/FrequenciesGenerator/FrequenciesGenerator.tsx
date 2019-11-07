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


const freqComponentGenerator = (color, name,id) => class YellowFreqComponent extends React.Component<YellowFreqComponentProps, YellowFreqComponentState> {


  constructor(props:YellowFreqComponentProps){
    super(props);
  }
  
  static fetchData(assayId: string) {
    return BushService.get(`/frecuencias/${color}?assayId=${assayId}`)
                      .then(data=>{return data})
  }

  render(){
    console.log(this.props.data)
    return (
      (!(this.props.data && Object.keys(this.props.data).length))?
            this.props.onEmptyRender(id,name)
              :
            <BoxPlot data={this.props.data} dataSuffix="Hz" title={name} graphPosition={this.props.graphPosition} />
          
    );
  }
};

const frequencyGenerator : ((freqColor: string, name: string) => DashboardType) = (freqColor, name) => ({
  id: `${freqColor}-frequency`,
  name,
  component: freqComponentGenerator(freqColor, name,`${freqColor}-frequency`),
});

export default frequencyGenerator;
