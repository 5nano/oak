import * as React from "react";

import Plot from 'react-plotly.js';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';
import GreenFreq from '../GreenFrequency/GreenFrequency';
import YellowFreq from '../YellowFrequency/YellowFrequency';
import LeafArea from '../LeafArea/LeafArea';
import LinearLeafAreaTreatments from '../LinearLeafAreaTreatments/LinearLeafAreaTreatments';
import Loader from "../../../Utilities/Loader/Loader";
import LeafAreaPerExperiments from '../LeafAreaPerExperiments/LeafAreaPerExperiments';

export interface OverallComponentState {
  lastDateWithData: string,
}

type AssayParamsType = {
  assayId: string,
}

export interface OverallComponentProps extends RouteComponentProps<AssayParamsType> {
  onEmptyRender: Function,
  dateRange: object,
  treatments:any,
  data: {
      [key: string]: {box, linear}
  },
}

const name = "Overview";

class OverallComponent extends React.Component<OverallComponentProps, OverallComponentState> {
  constructor(props:OverallComponentProps){
    super(props);
  }

  static fetchData() {
    return Promise.resolve();
  }


  render(){
    /*const leafAreaHasData = this.props.data[LeafArea.id] && this.props.data[LeafArea.id].box && Object.keys(this.props.data[LeafArea.id].box).length;
    const yellowFreqHasData = this.props.data[YellowFreq.id] && Object.keys(this.props.data[YellowFreq.id]).length;
    const greenFreqHasData = this.props.data[GreenFreq.id] && Object.keys(this.props.data[GreenFreq.id]).length;
    const linearLeafAreaTreatmentsHasData = this.props.data[GreenFreq.id] && Object.keys(this.props.data[LinearLeafAreaTreatments.id]).length;

    if (!leafAreaHasData && !yellowFreqHasData && !greenFreqHasData && !linearLeafAreaTreatmentsHasData) 
      return (
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Loader/>
      </div>)
    */


    return (
        <div className="Overall">
            <div className="left-panel">
                <LeafArea.component dateRange={this.props.dateRange} onEmptyRender={this.props.onEmptyRender} data={this.props.data[LeafArea.id]} graphPosition="left" treatments={this.props.treatments}/>
                <GreenFreq.component dateRange={this.props.dateRange} onEmptyRender={this.props.onEmptyRender} data={this.props.data[GreenFreq.id]} graphPosition="left" treatments={this.props.treatments}/>
                <LeafAreaPerExperiments.component dateRange={this.props.dateRange} onEmptyRender={this.props.onEmptyRender} data={this.props.data[LeafAreaPerExperiments.id]} graphPosition="left" treatments={this.props.treatments}/>
            </div>
            <div className="right-panel">
                <YellowFreq.component dateRange={this.props.dateRange} onEmptyRender={this.props.onEmptyRender} data={this.props.data[YellowFreq.id]} graphPosition="right" treatments={this.props.treatments}/>
                <LinearLeafAreaTreatments.component dateRange={this.props.dateRange} onEmptyRender={this.props.onEmptyRender} data={this.props.data[LinearLeafAreaTreatments.id]} graphPosition="right" treatments={this.props.treatments}/>
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
