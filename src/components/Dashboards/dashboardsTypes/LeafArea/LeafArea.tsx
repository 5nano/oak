
import * as React from "react";
import * as leafAreaScript from './LeafAreaScript';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from "react-router"
import { DashboardType } from '../InterfaceDashboardTypes';
import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";

type AssayParamsType = {
    assayId: string,
}
type Experiment = {
    y: Array<number>,
    text: Array<string>
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
            const experimentData : Experiment = { y: [], text: []};
            for (var j = 0; j < data[i].dataPoints.length; j++) {
                experimentData.y.push(data[i].dataPoints[j].y);
                experimentData.text.push(data[i].dataPoints[j].label);
            }
            experimentsData.push(experimentData);
        }
        return experimentsData;
    }

    

    render() { 
        const data: Plotly.Data[] = this.state.experimentsData.map(experiment => ({
            y: experiment.y,
            text: experiment.text,
            name: 'experimentos',
            type: 'scatter'
          }))
    
          const layout: Partial<Layout> = {
            annotations: [
              {
                text: 'Experiment aIds',
                x: 0,
                xref: 'paper',
              }
            ],
            title: name,
            xaxis: {
              title: 'Leaf Area',
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
  