import * as React from 'react';
import BushService from '../../../../services/bush';
import Plot from 'react-plotly.js';
import Plotly = require('plotly.js');

interface SankeyDiagram{
    label: Array<string>
    source:Array<Number>
    target:Array<Number>
    value:Array<Number>
}

interface ISankeyDiagramProps{

}

interface ISankeyDiagramState{
    sankeyDiagram:SankeyDiagram,
    loading:boolean
}

class SankeyDiagram extends React.Component<ISankeyDiagramProps,ISankeyDiagramState> {

    constructor(props){
        super(props)
        this.state = {
            sankeyDiagram:null,
            loading:true
        }
    }

    componentDidMount(){
        BushService.get('/metricas/ensayos/sankey')
                    .then(data=> {
                        console.log(data)
                        this.setState({sankeyDiagram:data,loading:false})
                    })
    }

    renderGraph(){
        
        const source = this.state.sankeyDiagram.source
        const target = this.state.sankeyDiagram.target
        const value = this.state.sankeyDiagram.value
        const label = this.state.sankeyDiagram.label

        Plotly.d3.json('https://raw.githubusercontent.com/plotly/plotly.js/master/test/image/mocks/sankey_energy.json', function(fig){

        const data = {
        type: "sankey",
        domain: {
            x: [0,1],
            y: [0,1]
        },
        orientation: "h",
        valueformat: ".0f",
        valuesuffix: "TWh",
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


        var layout = {
        title:"Diagrama sankey de relación Agroquímicos/Mezclas",
        font: {size:12},
        width: 600,
        height: 400,
        }

        Plotly.plot('sankey-container', [data], layout,{responsive:true})
        });
    }

    render(){

        if(!this.state.loading) this.renderGraph()
        return (
            <div id="sankey-container" className="sankey-chart"/>
        )
    }
}

export default SankeyDiagram;