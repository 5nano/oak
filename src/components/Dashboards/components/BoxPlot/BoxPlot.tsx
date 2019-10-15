import * as React from "react";

import { Layout } from "plotly.js";
import { IFrontExperiment, IBackendExperiment } from '../../../../Interfaces/Experimento';
import Popper from '@material-ui/core/Popper';
import DrillDown from "./components/Drilldown/Drilldown";
import BushService from '../../../../services/bush';
import { Experimento } from './ExperimentoType';
import Plot from 'react-plotly.js';

type GraphData = {
  [key: string /* date */]: {
    [key: number /* treatmentId */]: Array<number> /* values */
  }
};

export interface BoxPlotState{
  selectedBox: {
    date: string,
    treatmentId: number,
  },
  treatmentsData: {
    [key:number]: Array<Experimento>
  }
}

export interface BoxPlotProps {
  data: GraphData,
  dataSuffix?: string,
  title: string,
  graphPosition: 'left' | 'right', 
}

const namePrefix = 'Treatment ';
class BoxPlot extends React.PureComponent<BoxPlotProps, BoxPlotState> {
  constructor(props:BoxPlotProps){
    super(props);
    this.state = {
      selectedBox: null,
      treatmentsData: {}
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
    return BushService.get(`/tratamiento/experimentos?treatmentId=${treatmentId}`)
      .then((experimentos: Array<Experimento>) => {
        this.setState({ 
          treatmentsData: {
            ...this.state.treatmentsData,
            [treatmentId]: experimentos
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
      if (!(this.props.data && Object.keys(this.props.data).length)) return null;

      const treatmentValues = {};

      Object.keys(this.props.data).map(date => {
        const dateData = this.props.data[date];

        Object.keys(dateData).map(treatmentId => {
            dateData[treatmentId].map(treatmentValue => {
              if (!treatmentValues[treatmentId]) {
                treatmentValues[treatmentId] = {
                  y: [treatmentValue],
                  x: [date]
                }
              } else {
                treatmentValues[treatmentId].y.push(treatmentValue);
                treatmentValues[treatmentId].x.push(date);
              }
            })
        });
      })

      const data: Plotly.Data[] = Object.keys(treatmentValues).map(treatmentId => ({
        y: treatmentValues[treatmentId].y,
        x: treatmentValues[treatmentId].x,
        name: `${namePrefix + treatmentId}`,
        type: 'box'
      }))

      const layout = {
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
      <>
          {
            this.state.selectedBox &&
            <Popper
              open={true}
              placement={this.props.graphPosition}
              disablePortal={true}
              anchorEl={document.querySelector(`#graph-${this.props.title.replace(/\s/g, '-')}`)}
              modifiers={{
                flip: {
                  enabled: true,
                },
                preventOverflow: {
                  enabled: true,
                  boundariesElement: 'scrollParent',
                },
                arrow: {
                  enabled: true,
                },
              }}
              style={{zIndex: 1000}}
            >
              <DrillDown 
                treatmentId={this.state.selectedBox.treatmentId} 
                date={this.state.selectedBox.date}
                data={this.state.treatmentsData[this.state.selectedBox.treatmentId]}
                close={this.closeDrilldown.bind(this)}
                pointerDirection={this.props.graphPosition}
              />
            </Popper>
        }
        <div id={`graph-${this.props.title.replace(/\s/g, '-')}`} className="PlotlyGraph BoxPlot">
          <Plot
            data={data}
            layout={layout}
            onClick={this.handleBoxClick}
            style={{position: 'relative', display: 'flex', width: "100%", height: "100%"}}
            useResizeHandler={true}
          />
        </div>
      </>
    );
  }
};


export default BoxPlot;
