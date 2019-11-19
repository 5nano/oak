import * as React from 'react';
import BushService from '../../../../services/bush';
import Plotly = require('plotly.js/lib/index-basic');
import Loader from '../../../Utilities/Loader/Loader';

export interface SunburstChart{
    labels:Array<string>
    parents:Array<string>
    ids:Array<string>
    branchValues:string
}

interface ISunburstChartProps{
    data:SunburstChart
}

interface ISunburstChartState{
    sunburstChart:SunburstChart
}

class Sunburst extends React.Component<ISunburstChartProps,ISunburstChartState> {

    constructor(props){
        super(props)
        this.state = {
            sunburstChart:null
        }
    }

    componentDidMount(){
        this.setState({sunburstChart:this.props.data})
    }

    renderGraph(){
        var data:Partial<Plotly.PlotData> = 
            {
                type: "sunburst",
                labels: this.state.sunburstChart.labels,
                parents: this.state.sunburstChart.parents,
                ids:  this.state.sunburstChart.ids,
                leaf: {"opacity": 0.4},
                marker: {"line": {"width": 4}},
                outsidetextfont: {size: 20, color:"#377eb8"},
                branchvalues: this.state.sunburstChart.branchValues
            };
            
            var layout:Partial<Plotly.Layout>= {
                height: 800,
                width:600,
                margin: {"l": 0, "r": 0, "b": 0, "t": 0},
                sunburstcolorway:["#636efa","#ef553b","#00cc96"],
            };
            
            Plotly.newPlot('sunburst-chart', [data], layout)

    }

    render(){
        
        this.state.sunburstChart!=null && this.renderGraph()

        return (
            <div id="sunburst-chart"/>

        )
    }
}

export default Sunburst;