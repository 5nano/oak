import * as React from 'react';
import Histogram from './components/Histogram/Histogram';
import Gantt from './components/Gantt/Gantt';
import Sankey from './components/SankeyDiagram/Sankey';
import Sunburst from './components/SunburstChart/Sunburst';

interface IOverallState{

}

interface IOverallProps{

}
class Overall extends React.Component<IOverallProps,IOverallState> {

    constructor(props){
        super(props);

        this.state = {
            histogram:null
        }
    }

    render(){
        return (
            <div className="overall-container">
                <div className="overall-wrapper">
                    <div className="gant-wrapper">
                        <Gantt/>
                    </div>

                    <div className="charts-row">
                        <Sankey/>

                        <Histogram/>

                        <Sunburst/>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Overall;