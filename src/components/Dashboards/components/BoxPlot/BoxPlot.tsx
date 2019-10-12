import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { DashboardType } from '../InterfaceDashboardTypes';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';

interface Box {
    experiment: number,
    values: Array<number>
}

interface BoxPorFecha {
    date: string,
    values: Array<Box>
}

type GraphData = Array<BoxPorFecha>;

export interface BoxPlotState{

}

type AssayParamsType = {
  assayId: string,
}

export interface BoxPlotProps extends RouteComponentProps<AssayParamsType> {
  data: GraphData,
}


class BoxPlot extends React.Component<BoxPlotProps, BoxPlotState> {


  constructor(props:BoxPlotProps){
    super(props)
  }
  

  render(){
      if (!(this.props.data && this.props.data.length)) return null;

      const dataY = [];
      const dataX = [];

      this.props.data.map(boxEnFecha => {
        dataX.push(boxEnFecha.date);
        
        boxEnFecha.values.map(experiment => {
            return ({
                y: boxEnFecha.values,
                boxpoints: 'all',
                boxpoints: 'suspectedoutliers',
                name: experiment.experimentId,
                type: 'box'
            })
        })
      })

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
    return (
        <div className="PlotlyGraph YellowFreq">
          <Plot
            data={data}
            layout={layout}
          />
        </div>
    );
  }
};


export default BoxPlot;
