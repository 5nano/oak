import * as React from 'react';
import BushService from '../../../../services/bush';
import Plotly = require('plotly.js');
import Loader from '../../../Utilities/Loader/Loader';


export interface IDates{
    [key: string]: string[]
}

interface IHistogramProps{
    data:IDates
}

interface IHistogramState{
    dates:IDates
}

class Histogram extends React.Component<IHistogramProps,IHistogramState> {

    constructor(props){
        super(props)
        this.state = {
            dates:null,
            
        }
    }

    componentDidMount(){
        this.setState({dates:this.props.data})
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
            title:"Imágenes capturadas por día por ensayo.",
            barmode: 'stack',
            width: 850,
            height: 400,
            }
        
        Plotly.newPlot("histogram-container", data,layout)
    }

    render(){
        this.state.dates!=null && this.renderGraph()
        return (
            <div id="histogram-container"/>
        )
    }
}

export default Histogram;