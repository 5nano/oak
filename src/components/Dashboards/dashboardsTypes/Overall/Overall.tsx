import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';
import YellowFreq from '../YellowFreq/YellowFreq';
import LeafArea from '../LeafArea/LeafArea';

export interface OverallComponentState {
  experiments: Array<IFrontExperiment>,
  loading: boolean,
}

type AssayParamsType = {
  assayId: string,
}

export interface OverallComponentProps extends RouteComponentProps<AssayParamsType> {
  onEmptyRender: Function,
  data: {
      [key: string]: Array<IFrontExperiment>
  },
}

const name = "Overview";

class OverallComponent extends React.Component<OverallComponentProps, OverallComponentState> {
  constructor(props:OverallComponentProps){
    super(props)
  }

  static fetchData() {
    return Promise.resolve();
  }

  render(){
    return (
        <div className="Overall">
            <div className="left-panel">
                <LeafArea.component onEmptyRender={this.props.onEmptyRender} data={this.props.data[LeafArea.id]}/>
            </div>
            <div className="right-panel">
                <YellowFreq.component onEmptyRender={this.props.onEmptyRender} data={this.props.data[YellowFreq.id]} graphPosition="right"/>
            </div>
        </div>
    );
  }
};

const overal : DashboardType = {
  id: 'overall',
  name,
  component: OverallComponent,
};

export default overal;
