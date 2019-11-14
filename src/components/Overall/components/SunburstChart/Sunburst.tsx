import * as React from 'react';
import BushService from '../../../../services/bush';
import Plotly = require('plotly.js/lib/index-basic');

interface SunburstChart{
    labels:Array<string>
    parents:Array<string>
    values:Array<Number>
    branchValues:string
}

interface ISunburstChartProps{

}

interface ISunburstChartState{
    sunburstChart:SunburstChart,
    loading:boolean
}

class Sunburst extends React.Component<ISunburstChartProps,ISunburstChartState> {

    constructor(props){
        super(props)
        this.state = {
            sunburstChart:null,
            loading:true
        }
    }

    componentDidMount(){
        BushService.get('/metricas/mezclasAgroquimicos')
                    .then(data=> {
                        this.setState({sunburstChart:data,loading:false})
                    })
    }

    renderGraph(){
        var data:Partial<Plotly.PlotData> = 
            {
                type: "sunburst",
                labels: this.state.sunburstChart.labels,
                parents: this.state.sunburstChart.parents,
                values:  this.state.sunburstChart.values,
                leaf: {"opacity": 0.4},
                marker: {"line": {"width": 2}},
                branchvalues: this.state.sunburstChart.branchValues
            };
            
            var layout = {
                "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
            };
            
            Plotly.newPlot('sunburst-chart', [data], layout)

    }

    render(){
        
        if(!this.state.loading) this.renderGraph()

        return (
            <div id="sunburst-chart"/>

        )
    }
}

export default Sunburst;