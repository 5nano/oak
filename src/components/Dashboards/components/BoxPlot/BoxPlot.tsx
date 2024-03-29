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
  dateRange?: object,
  title: string,
  graphPosition: 'left' | 'right', 
  treatments:any
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
    const treatmentId = Number(e.points[0].data.label.replace(namePrefix, ''));
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
                  x: [new Date(date)]
                }
              } else {
                treatmentValues[treatmentId].y.push(treatmentValue);
                treatmentValues[treatmentId].x.push(new Date(date));
              }
            })
        });
      })

      const data: Plotly.Data[] = Object.keys(treatmentValues).map(treatmentId => ({
        y: treatmentValues[treatmentId].y,
        x: treatmentValues[treatmentId].x,
        name:this.props.treatments[treatmentId],
        label: treatmentId,
        
        type: 'box'
      }))

      const layout = {
        ...this.props.dateRange,
        yaxis: {
          ticksuffix: ` ${this.props.dataSuffix}`,
        },
        boxmode: "group",
        autosize: true,
      };

      const popperPosition = this.props.graphPosition === 'left' ? 'right' : 'left';

      return (
      <>
          {
            this.state.selectedBox &&
            <Popper
              open={true}
              placement={popperPosition}
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
                experiments={this.state.treatmentsData[this.state.selectedBox.treatmentId]}
                close={this.closeDrilldown.bind(this)}
                pointerDirection={this.props.graphPosition}
                treatmentName={this.props.treatments[this.state.selectedBox.treatmentId]}
              />
            </Popper>
        }
        <div id={`graph-${this.props.title.replace(/\s/g, '-')}`} className="plot-graph">
          <h4>{this.props.title}</h4>
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
