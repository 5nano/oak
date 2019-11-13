import * as React from 'react';
import BushService from '../../../../services/bush';

interface Histogram{
    picturesCount: Array<Number>,
    dates: Array<string>
}

interface IHistogramProps{

}

interface IHistogramState{
    histogram:Histogram
}

class Histogram extends React.Component<IHistogramProps|IHistogramState> {

    constructor(props){
        super(props)
        this.state = {
            histogram:null
        }
    }

    componentDidMount(){
        BushService.get('/metricas/histograma/pruebas')
                    .then(data=> {
                        console.log(data)
                        this.setState({histogram:{picturesCount:data.count,dates:data.dates}})
                    })
    }

    render(){
        return (
            <div>
            </div>
        )
    }
}

export default Histogram;