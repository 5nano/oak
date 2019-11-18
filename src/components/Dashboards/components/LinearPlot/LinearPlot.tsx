import * as React from "react";

import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import Popper from '@material-ui/core/Popper';
import BushService from '../../../../services/bush';
import Plot from 'react-plotly.js';
import { ExperimentData } from './ExperimentoData';
import hardcodedData from './mockedData';


export interface LinearPlotState {
  selectedBox: {
    date: string,
    treatmentId: number,
  },
  experimentsData: {
    [key:number]: Array<ExperimentData>
  }
}

export interface LinearPlotProps {
  data: any,
  dataSuffix?: string,
  dateRange: object,
  title: string,
  graphPosition: 'left' | 'right', 
}

const namePrefix = 'Experiment ';
class LinearPlot extends React.PureComponent<LinearPlotProps, LinearPlotState> {
  constructor(props:LinearPlotProps){
    super(props);
    this.state = {
      selectedBox: null,
      experimentsData: {}
    }
    this.handleBoxClick = this.handleBoxClick.bind(this);
  }
  
  handleBoxClick(e) {
    const date = e.points[0].x;
    const treatmentId = Number(e.points[0].data.name.replace(namePrefix, ''));
    this.showDetail(treatmentId, date);
    return this.fetchExperiments(treatmentId);
  }

  fetchExperiments(treatmentId:number) {
    return BushService.get(`/graficoComparativo/tratamiento/experimentos?treatmentId=${treatmentId}`)
      .then((experimentsData: Array<ExperimentData>) => {
        this.setState({ 
          experimentsData: {
            ...this.state.experimentsData,
            [treatmentId]: experimentsData
          }
        })
      })
  }

  closeDrilldown() {
    this.setState({
      selectedBox: null,
    })
  }

  showDetail(treatmentId: number, date: string) {
    this.setState({
      selectedBox: {
        date,
        treatmentId,
      }
    })
  }
  render(){
      const experimentData = this.props.data;
      if (!(experimentData && Object.keys(experimentData).length)) return null;

      const data: Plotly.Data[] = Object.keys(experimentData).map(experimentId => ({
        y: experimentData[experimentId].map((pointData) => pointData.value),
        x: experimentData[experimentId].map((pointData) => new Date(pointData.instant)),
        name: `${namePrefix + experimentId}`,
        type: 'scatter'
      }))

      const layout: Partial<Layout> = {
        ...this.props.dateRange,
        yaxis: {
          ticksuffix: ` ${this.props.dataSuffix}`,
        },
      };

      return (
      <>
        <div id={`graph-${this.props.title.replace(/\s/g, '-')}`} className="plot-graph">
          <h4>{this.props.title}</h4>
          <Plot
            data={data}
            layout={layout}
            style={{position: 'relative', display: 'flex', width: "100%", height: "100%"}}
            useResizeHandler={true}
          />
        </div>
      </>
    );
  }
};


export default LinearPlot;
