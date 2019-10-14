import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import { RouteComponentProps } from 'react-router-dom';


type GraphData = {
  [key: string /* date */]: {
    [key: number /* experimentId */]: Array<number> /* values */
  }
};

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

      const experimentValues = {};

      Object.keys(this.props.data).map(date => {
        const dateData = this.props.data[date];

        Object.keys(dateData).map(experimentId => {
            dateData[experimentId].map(experimentValue => {
              if (!experimentValues[experimentId]) {
                experimentValues[experimentId] = {
                  y: [experimentValue],
                  x: [date]
                }
              } else {
                experimentValues[experimentId].y.push(experimentValue);
                experimentValues[experimentId].x.push(date);
              }
            })
        });
      })

      const data: Plotly.Data[] = Object.keys(experimentValues).map(experimentId => ({
        y: experimentValues[experimentId].y,
        x: experimentValues[experimentId].x,
        // boxpoints: 'suspectedoutliers',
        name: `Experimento ${experimentId}`,
        type: 'box'
      }))

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

    return (
        <div className="PlotlyGraph BoxPlot">
          <Plot
            data={data}
            layout={layout}
          />
        </div>
    );
  }
};


export default BoxPlot;
