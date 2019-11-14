
import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { DashboardType } from '../InterfaceDashboardTypes';
import Plot from 'react-plotly.js';
import { Layout } from "plotly.js";
import BushService from '../../../../services/bush';
import BoxPlot from '../../components/BoxPlot/BoxPlot';
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
    data: {
      linear: Array<Experiment>,
      box
    },
    graphPosition?: 'left' | 'right', 
}
interface LeafAreaState {
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


const name = "Área foliar";
class LeafArea extends React.Component<LeafAreaProps, LeafAreaState> {
    constructor(props: LeafAreaProps) {
        super(props);
    }

    static fetchData(assayId: string) {
      
      return Promise.all([
        // BushService.get(`/graficoComparativo/experimentos?assayId=${assayId}`).then(generateExperimentData),
        BushService.get(`/medians/area?assayId=${assayId}`)
      ])
        .then(([ /* linear, */ box ]) => {
          // I'll just remap this so then we can access this data as this.props.data.linear and this.props.data.box
          
          return {
            // linear,
            box
          }
        })
    }
    

    render() { 
      //debugger;
        if (!(this.props.data && this.props.data.box &&  Object.keys(this.props.data.box).length)) return this.props.onEmptyRender('leaf-area',name);
        // const linearData: Plotly.Data[] = this.props.data.linear.map(experiment => ({
        //     x: experiment.dates,
        //     y: experiment.values,
        //     name: experiment.name,
        //     type: 'scatter'
        //   }))

          const layout: Partial<Layout> = {
              showlegend: true,

            title: name,
            xaxis: {
              type: 'date',
              autorange: true,
              rangeselector: {buttons: [
                {
                  count: 7,
                  label: '1w',
                  step: 'day',
                  stepmode: 'todate'
                },
                {
                  count: 1,
                  label: '1m',
                  step: 'month',
                  stepmode: 'backward'
                },
                {step: 'all'}
              ]},
            rangeslider: {},
            },
            yaxis: {
                tickformat: '.3s', // Hasta 3 dígitos
                ticksuffix: "px²",
                showticksuffix: "all"
            },
            autosize: true,
          };

        return (
            <BoxPlot 
              data={this.props.data.box} 
              dataSuffix="px²" 
              title={name} 
              graphPosition={this.props.graphPosition} 
            /> 
        )
    }
};

const leafAreaType : DashboardType = {
    id: 'leaf-area',
    name,
    component: LeafArea,
  };
  
  export default leafAreaType;
  