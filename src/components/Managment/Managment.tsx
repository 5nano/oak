import * as React from 'react';
import Histogram, { IDates } from './components/Histogram/Histogram';
import Sankey, { SankeyDiagram } from './components/SankeyDiagram/Sankey';
import Sunburst, { SunburstChart } from './components/SunburstChart/Sunburst';
import Loader from '../Utilities/Loader/Loader';
import BushService from '../../services/bush';

interface IOverallState{
    loading:number,
    histogram: IDates,
    sankey:SankeyDiagram,
    sunburst:SunburstChart
}

interface IOverallProps{

}
class Managment extends React.Component<IOverallProps,IOverallState> {

    constructor(props){
        super(props);

        this.state = {
            loading:0,
            histogram:null,
            sankey:null,
            sunburst:null
        }
    }


    componentDidMount(){
        BushService.get('/metricas/histograma/pruebas')
                    .then(data=> {
                        this.setState({histogram:data.dates})
                        this.setLoading()
                    })
        BushService.get('/metricas/ensayos/sankey')
                    .then(data=> {
                        this.setState({sankey:data})
                        this.setLoading()
                    })

        BushService.get('/metricas/mezclasAgroquimicos')
                    .then(data=> {
                        console.log(data)
                        this.setState({sunburst:data})
                        this.setLoading()
                    })
    }

    setLoading(){
        this.setState (prevState => {
            var loading = prevState.loading
            loading+=1
            return {loading}
        })
    }

    isLoading(){
        return this.state.loading < 3
    }

    render(){
        return (
            <div className="overall-container">
                {this.isLoading()? 
                    <Loader/> 
                :
                    <div className="overall-wrapper">
                        <div className="overall-column">
                            <Sunburst data={this.state.sunburst}/>
                        </div>
                        <div className="overall-column">
                            <Sankey data={this.state.sankey}/>
                            <Histogram data={this.state.histogram}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Managment;