import * as React from "react";

import Plot from 'react-plotly.js';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';
import YellowFreq from '../YellowFreq/YellowFreq';
import LeafArea from '../LeafArea/LeafArea';

export interface OverallComponentState {
  loading: boolean,
}

type AssayParamsType = {
  assayId: string,
}

export interface OverallComponentProps extends RouteComponentProps<AssayParamsType> {
  onEmptyRender: Function,
  data: {
      [key: string]: {box, linear}
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
    const leafAreaHasData = this.props.data[LeafArea.id] && this.props.data[LeafArea.id].box && Object.keys(this.props.data[LeafArea.id].box).length;
    const yellowFreqHasData = this.props.data[YellowFreq.id] && Object.keys(this.props.data[YellowFreq.id]).length;

    if (!leafAreaHasData && !yellowFreqHasData) return this.props.onEmptyRender();

    return (
        <div className="Overall">
            <div className="left-panel">
                <LeafArea.component onEmptyRender={this.props.onEmptyRender} data={this.props.data[LeafArea.id]} graphPosition="left"/>
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
