import * as React from 'react';
import BushService from '../../../../services/bush';
import Plotly = require('plotly.js');


interface IDates{
    [key: string]: string[]
}

interface IHistogramProps{

}

interface IHistogramState{
    dates: IDates
    loading:boolean
}

class Histogram extends React.Component<IHistogramProps,IHistogramState> {

    constructor(props){
        super(props)
        this.state = {
            dates:null,
            loading:true
        }
    }

    componentDidMount(){
        BushService.get('/metricas/histograma/pruebas')
                    .then(data=> {
                        this.setState({dates:data.dates,loading:false})
                    })
    }

    renderGraph(){
        let traces:Array<Partial<Plotly.PlotData>> = [];
        Object.keys(this.state.dates).forEach(key => {
            let trace:Partial<Plotly.PlotData> = {
                name: key,
                x: this.state.dates[key],
                type: "histogram",
                marker: {
                    opacity:0.6
                }
            }
            traces.push(trace)
        })
        
        var data = traces;
        var layout:Partial<Plotly.Layout> = {
            barmode: 'stack',
            width: 600,
            height: 400,
            }
        
        Plotly.newPlot("histogram-container", data,layout)
    }

    render(){
        if(!this.state.loading) this.renderGraph()
        return (
            <div id="histogram-container"/>
        )
    }
}

export default Histogram;