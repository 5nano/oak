import * as React from 'react';
import BushService from '../../../../services/bush';

interface SunburstChart{
}

interface ISunburstChartProps{

}

interface ISunburstChartState{
    sunburstChart:SunburstChart
}

class SunburstChart extends React.Component<ISunburstChartProps|ISunburstChartState> {

    constructor(props){
        super(props)
        this.state = {
            sunburstChart:null
        }
    }

    componentDidMount(){
        BushService.get('/metricas/mezclasAgroquimicos')
                    .then(data=> {
                        console.log(data)
                    })
    }

    render(){
        return (
            <div>

            </div>

        )
    }
}

export default SunburstChart;