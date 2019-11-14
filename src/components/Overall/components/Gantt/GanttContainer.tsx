import * as React from 'react';
import Gantt from './Gantt';
import ChartContainer from '../ChartContainer.tsx/ChartContainer';


const GanttContainer:React.SFC = (props) => {

    return(
        <ChartContainer title="Planificación de ensayos" chart={Gantt}/>
    )
}

export default GanttContainer;