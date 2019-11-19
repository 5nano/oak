import * as React from 'react';
import BushService from '../../../../services/bush';
import Plot from 'react-plotly.js';
import Plotly = require('plotly.js/lib/index-basic');

export interface SankeyDiagram{
    label: Array<string>
    source:Array<Number>
    target:Array<Number>
    value:Array<Number>
}

interface ISankeyDiagramProps{
    data:SankeyDiagram
}

interface ISankeyDiagramState{
    sankeyDiagram:SankeyDiagram
}

class Sankey extends React.Component<ISankeyDiagramProps,ISankeyDiagramState> {

    constructor(props){
        super(props)
        this.state = {
            sankeyDiagram:null
        }
    }

    componentDidMount(){
        this.setState({sankeyDiagram:this.props.data})
    }


    renderGraph(){
        
        const source = this.state.sankeyDiagram.source
        const target = this.state.sankeyDiagram.target
        const value = this.state.sankeyDiagram.value
        const label = this.state.sankeyDiagram.label

        Plotly.d3.json('https://raw.githubusercontent.com/plotly/plotly.js/master/test/image/mocks/sankey_energy.json', function(fig){

        const data:Partial<Plotly.PlotData> = {
            type: "sankey",
            domain: {
                x: [0,1],
                y: [0,1]
            },
            orientation: "h",
            valueformat: ".0f",
            valuesuffix: "u",
            node: {
                pad: 15,
                thickness: 15,
                line: {
                color: "black",
                width: 0.5
                },
            label: label,
            color: fig.data[0].node.color
                },

            link: {
                source: source,
                target: target,
                value: value,
                label: label
            }
        }


        var layout:Partial<Plotly.Layout> = {
        title:"Flujo de componentes en ensayos.",
        font: {size:12},
        width: 850,
        height: 400,
        }

        Plotly.plot('sankey-container', [data], layout,{responsive:true})
        });
    }

    render(){

        this.state.sankeyDiagram!=null && this.renderGraph()
        return (
            <div id="sankey-container" className="sankey-chart"/>
        )
    }
}

export default Sankey;