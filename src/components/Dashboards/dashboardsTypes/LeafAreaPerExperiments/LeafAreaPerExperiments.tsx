
import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { DashboardType } from '../InterfaceDashboardTypes';
import Plot from 'react-plotly.js';
import { Layout } from "plotly.js";
import BushService from '../../../../services/bush';
import MultiPlot from '../../components/MultiPlot/MultiPlot';
import Loader from "../../../Utilities/Loader/Loader";

type AssayParamsType = {
    assayId: string,
}
type Experiment = {
    dates: Array<string>,
    values: Array<number>,
    text: Array<string>,
    name: string,
}
  
interface LeafAreaProps extends RouteComponentProps<AssayParamsType> {
    onEmptyRender: Function,
    dateRange: object,
    data: {
      box,
      linear
    },
    graphPosition?: 'left' | 'right', 
}
interface LeafAreaState {
  experimentsData
}

const generateExperimentData = (data: Array<{dataPoints: Array<{label: string, y: number}>}>) => {
    const experimentsData = [];
    for (var i = 0; i < data.length; i++) {
        const experimentData : Experiment = { dates:[], values: [], text: [], name: `Experimento ${i}`};
        for (var j = 0; j < data[i].dataPoints.length; j++) {
            experimentData.dates.push(`2019-08-${Math.floor(Math.random()*30 + 1)}`);
            experimentData.values.push(data[i].dataPoints[j].y);
            experimentData.text.push(data[i].dataPoints[j].label);
        }
        experimentsData.push(experimentData);
    }
    return experimentsData;
}


const name = "Área foliar de tratamientos";
class LeafAreaPerExperiments extends React.Component<LeafAreaProps, LeafAreaState> {
    constructor(props: LeafAreaProps) {
        super(props);
        this.state = {
          experimentsData: []
        };
        this.fetchExperimentsLinearData = this.fetchExperimentsLinearData.bind(this);
    }

    static fetchData(assayId: string) {
      
      return BushService.get(`/ensayo/tratamientos?idAssay=${assayId}`)
        .then((treatments) => {
          if (!(treatments && treatments.length)) {
            return [treatments]
          } 
          return BushService.get(`/graficoComparativo/tratamiento/experimentos?treatmentId=${treatments[0].idTreatment}`)
            .then((firstTreatmentData) => [
              treatments,
              firstTreatmentData
            ])
        })
        .then(([treatments, firstTreatmentData]) => {
          return {
            linear: {treatments, firstTreatmentData}
          }
        })
    }

    fetchExperimentsLinearData(treatmentId: string) {
      return BushService.get(`/graficoComparativo/tratamiento/experimentos?treatmentId=${treatmentId}`)
        .then((experimentsData: any) => {
          this.setState({ 
            experimentsData: {
              ...this.state.experimentsData,
              [treatmentId]: experimentsData
            }
          })
        })
    }
    

    render() {

        if (!(this.props.data && this.props.data.linear &&  Object.keys(this.props.data.linear).length)) return this.props.onEmptyRender('leaf-area',name);

        return (
          <MultiPlot 
            data={{linear: {...this.props.data.linear, values: this.state.experimentsData}}}
            dataSuffix="px" 
            title={name} 
            graphPosition={this.props.graphPosition}
            onLinearChange={this.fetchExperimentsLinearData}
            onEmptyRender={this.props.onEmptyRender}
            dateRange={this.props.dateRange}
          /> 
        )
    }
};

const leafAreaType : DashboardType = {
    id: 'leaf-area-per-experiments',
    name,
    component: LeafAreaPerExperiments,
  };
  
  export default leafAreaType;
  