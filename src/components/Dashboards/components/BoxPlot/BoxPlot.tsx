import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';


type GraphData = {
  [key: string /* date */]: {
    [key: number /* experimentId */]: Array<number> /* values */
  }
};

export interface BoxPlotState{

}


export interface BoxPlotProps {
  data: GraphData,
  dataSuffix?: string,
  title: string,
}


class BoxPlot extends React.Component<BoxPlotProps, BoxPlotState> {
  constructor(props:BoxPlotProps){
    super(props)
  }
  

  render(){
      if (!(this.props.data && Object.keys(this.props.data).length)) return null;

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
        name: `Experiment ${experimentId}`,
        type: 'box'
      }))

      const layout: Partial<Layout> = {
        title: this.props.title,
        xaxis: {
          tickprefix: '',
        },
        yaxis: {
          ticksuffix: ` ${this.props.dataSuffix}`,
        },
        boxmode: "group",
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
