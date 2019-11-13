import * as React from 'react';
import BushService from '../../../../services/bush';
import Plotly = require('plotly.js');
import Plot from 'react-plotly.js';

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

class SunburstChart extends React.Component<ISunburstChartProps,ISunburstChartState> {

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
                        console.log(data)
                        this.setState({sunburstChart:data,loading:false})
                    })
    }

   /* renderGraph(){
        var data = [
            {
              "type": "sunburst",
              "labels": ["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
              "parents": ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ],
              "values":  [65, 14, 12, 10, 2, 6, 6, 4, 4],
              "leaf": {"opacity": 0.4},
              "marker": {"line": {"width": 2}},
              "branchvalues": 'total'
            }];
            
            var layout = {
              "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
            };
            
            
            Plotly.newPlot('sunburst-chart', data, layout, {showSendToCloud: true})
            
    }*/

    render(){
        
        if(!this.state.loading){
            var data = [
                {
                  "type": "sunburst",
                  "labels": this.state.sunburstChart.labels,
                  "parents": this.state.sunburstChart.parents,
                  "values":  this.state.sunburstChart.values,
                  "leaf": {"opacity": 0.4},
                  "marker": {"line": {"width": 2}},
                  "branchvalues": this.state.sunburstChart.branchValues
                }];
                
                var layout = {
                  "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
                };
                
                
                Plotly.newPlot('sunburst-chart', data, layout, {showSendToCloud: true})
        
        }

        return (
            <div id="sunburst-chart"/>

        )
    }
}

export default SunburstChart;