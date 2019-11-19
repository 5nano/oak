import * as React from 'react';
import { gantt } from 'dhtmlx-gantt/codebase/sources/dhtmlxgantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
 
interface IGanttdhtmlxProps{
    tasks:any,

    zoom:any
}
class Ganttdhtmlx extends React.Component<IGanttdhtmlxProps> {

    setZoom(value) {
        switch (value) {
            case 'Horas':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';

                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    { unit:'hour', step:1, date:'%H' }
                ];
            break;
            case 'Dias':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'week';
                gantt.config.date_scale = '#%W';
                gantt.config.subscales = [
                    { unit: 'day', step: 1, date: '%d %M' }
                ];
                gantt.config.scale_height = 60;
            break;
            case 'Meses':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'month';
                gantt.config.date_scale = '%F';
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    { unit:'week', step:1, date:'#%W' }
                ];
            break;
            default:
            break;
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    componentDidMount() {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        const { tasks } = this.props;
        const data = {
            data: tasks
        }
        gantt.config.columns = [
            {name: "text", label: "Ensayo", width: 380, tree: true},
            {
            name: "start_time", label: "Inicio", template: function (obj) {
            return gantt.templates.date_grid(obj.start_date);
            }, align: "center", width: 80
            },
            {name: "duration", label: "Duración", align: "center", width: 70},
        ];
        var gridOnlyLayout = {
            css: 'gantt_container',
            cols: [
              {
                rows: [
                  { view: 'grid', scrollX: 'gridScrollX', scrollY: 'scrollVer' },
                  { view: 'scrollbar', id: 'gridScrollX', group: 'horizontal' },
                ]
              },
              {
              width: 1,
              rows: [
              { view: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
              { view: 'scrollbar', id: 'scrollHor', group: 'horizontal' },
            ]
          },
              { view: 'scrollbar', id: 'scrollVer' }
          ]
          };

          var gridTimelineLayout = {
            css: 'gantt_container',
            cols: [
              {
                width: 530,
                min_width: 300,
                rows: [
                  { view: 'grid', scrollX: 'gridScrollX', scrollable:true, scrollY: 'scrollVer' },
                  { view: 'scrollbar', id: 'gridScrollX', group: 'horizontal' },
                ]
              },
              {
              rows: [
              { view: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
              { view: 'scrollbar', id: 'scrollHor', group: 'horizontal' },
            ]
          },
              { view: 'scrollbar', id: 'scrollVer' }
          ]
          };
        
        gantt.config.layout = gridTimelineLayout;
        gantt.config.readonly = true;
        
        gantt.init('gantt-chart');
        gantt.parse(data);
        gantt.render();
    }

    render() {
        const { zoom } = this.props;
        this.setZoom(zoom);
       return (
           <div id="gantt-chart" className="gantt-chart"/>
       );
    }
}

export default Ganttdhtmlx;