import * as React from 'react';
import { gantt } from 'dhtmlx-gantt/codebase/sources/dhtmlxgantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
 
interface IGanttChartProps{
    tasks: any
}

class GanttChart extends React.Component<IGanttChartProps> {
    componentDidMount() {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        const { tasks } = this.props;
        gantt.init('gant-container');
        gantt.parse(tasks);
    }

    render() {
       return (
           <div ref={'gant-container'}
                style={ { width: '100%', height: '100%' } }
            ></div>
       );
    }
}

export default GanttChart;