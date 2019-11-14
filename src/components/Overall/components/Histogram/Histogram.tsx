import * as React from 'react';
import BushService from '../../../../services/bush';
import Plotly = require('plotly.js/lib/index-basic');

interface IHistogram{
    count: Array<Number>,
    dates: Array<string>
}

interface IHistogramProps{

}

interface IHistogramState{
    histogram:IHistogram,
    loading:boolean
}

class Histogram extends React.Component<IHistogramProps,IHistogramState> {

    constructor(props){
        super(props)
        this.state = {
            histogram:null,
            loading:true
        }
    }

    componentDidMount(){
        BushService.get('/metricas/histograma/pruebas')
                    .then(data=> {
                        console.log(data)
                        this.setState({histogram:data,loading:false})
                    })
    }

    renderGraph(){

    
        var trace:Partial<Plotly.PlotData> = {
            x: this.state.histogram.dates,
            type: 'histogram',
        };
        var data = [trace];
        var layout = {
            title:'Histograma de imágenes capturadas',
            font:{size:12},
            width: 600,
            height: 400,
            }
        Plotly.newPlot("histogram-container", data,layout,{responsive:true})
    }

    render(){
        if(!this.state.loading) this.renderGraph()
        return (
            <div id="histogram-container"/>
        )
    }
}

export default Histogram;