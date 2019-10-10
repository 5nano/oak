
import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from "react-router"
import { DashboardType } from '../InterfaceDashboardTypes';
import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";

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
    onEmptyRender: Function
}
interface LeafAreaState {
    experimentsData: Array<Experiment>,
}


const name = "Área foliar";
class LeafArea extends React.Component<LeafAreaProps, LeafAreaState> {
    constructor(props: LeafAreaProps) {
        super(props);
        this.state = {
            experimentsData: [],
        }
        this.fetchGraph(this.props.match.params.assayId);
    }

    fetchGraph(assayId: string) {
        fetch(`https://nanivo-bush.herokuapp.com/graficoComparativo/experimentos?assayId=${assayId}`,{
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            }
          })
            .then(res => res.json())
            .then(this.generateExperimentData)
            .then((experimentsData) => {
                this.setState({
                    experimentsData,
                });
            })
    }

    generateExperimentData(data: Array<{dataPoints: Array<{label: string, y: number}>}>) {
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

    

    render() { 
        const data: Plotly.Data[] = this.state.experimentsData.map(experiment => ({
            x: experiment.dates,
            y: experiment.values,
            name: experiment.name,
            type: 'scatter'
          }))

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
                ticksuffix: " mm2",
                showticksuffix: "all"
            },
            autosize: false,
          };

        return (
            <>
                <Plot
                    data={data}
                    layout={layout}
                />
                <div id='someDiv' />
            </>
        )
    }
};

const leafAreaType : DashboardType = {
    id: 'leaf-area',
    name,
    component: withRouter(LeafArea),
  };
  
  export default leafAreaType;
  