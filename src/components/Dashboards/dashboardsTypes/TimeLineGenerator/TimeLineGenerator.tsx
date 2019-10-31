import * as React from "react";

import Plot from 'react-plotly.js';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../../../services/bush';
import TimeLine from '../../components/TimeLine/TimeLine';

export interface TimeLineComponentState{
  experiments: Array<IFrontExperiment>,
  loading: boolean,
}
type AssayParamsType = {
  assayId: string,
}

export interface TimeLineComponentProps extends RouteComponentProps<AssayParamsType> {
  onEmptyRender: Function,
  data: any,
  graphPosition?: 'left' | 'right',
}


const timeLineComponentGenerator = (typeLine, name) => class TimeLineComponent extends React.Component<TimeLineComponentProps, TimeLineComponentState> {


  constructor(props:TimeLineComponentProps){
    super(props);
  }

  static fetchData(assayId: string) {
    return BushService.get(`/graficoComparativo/ensayo/tratamientos/promediado?assayId=${assayId}`)
  }

  render(){
    if (!(this.props.data && Object.keys(this.props.data).length)) return this.props.onEmptyRender();
    return (
        <div className="PlotlyGraph TimeLine">
          <TimeLine data={this.props.data} dataSuffix="mm^2" title={name} graphPosition={this.props.graphPosition} />
        </div>
    );
  }
};

const timeLineGenerator : ((timeLineColor: string, name: string) => DashboardType) = (timeLineType, name) => ({
  id: `${timeLineType}-timeLine`,
  name,
  component: timeLineComponentGenerator(timeLineType, name),
});

export default timeLineGenerator;
