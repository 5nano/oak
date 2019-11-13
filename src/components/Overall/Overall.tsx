import * as React from 'react';
import Histogram from './components/Histogram/Histogram';
import SankeyDiagram from './components/SankeyDiagram/SankeyDiagram';
import SunburstChart from './components/SunburstChart/SunburstChart';
import Gantt from './components/Gantt/Gantt';

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
                    <Gantt/>
                    
                    <SankeyDiagram/>

                    <Histogram/>
                </div>
            </div>
        )
    }
}

export default Overall;