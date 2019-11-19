import * as React from 'react';
import BushService from '../../../../services/bush';
import { assayState } from '../../../Home/Home';
import Chart from 'react-google-charts'
import Loader from '../../../Utilities/Loader/Loader';
import Ganttdhtmlx from './Ganttdhtmlx';
import Toolbar from './Toolbar/Toolbar';

interface GanttAssay{
    finishDate:string,
    name:string,
    startDate:string,
    status:assayState
}

interface IGanttProps{

}

interface IGanttState{
    gantt:Array<GanttAssay>,
    loading:boolean,
    currentZoom: string
}

class Gantt extends React.Component<IGanttProps,IGanttState> {

    constructor(props){
        super(props)
        this.state = {
            gantt:null,
            loading:true,
            currentZoom: 'Days'
        }
    }

    componentDidMount(){
        BushService.get('/metricas/ensayos/gantt')
                    .then(data=> {
                        this.setState({gantt:data.jobDTOS,loading:false})
                    })
    }

    getDate(date:string):Date{
        let stringbits = date.split(/\D/);
        let bits = stringbits.map(bit => {return Number(bit)})
        let parsedDate = new Date(bits[0],--bits[1],bits[2],bits[3],bits[4])
        return parsedDate;
    }

    getDifferenceInDays(startDate:string,endDate:string){
        
        let difference=Math.round(this.getDate(endDate).getTime() - this.getDate(startDate).getTime()).toFixed(0)
        console.log(difference)
        if(difference=='0') return 1;
        else return Number.parseInt(difference) / (1000 * 3600 * 24);
    }

    getTasks() {
        return this.state.gantt.map (assay => {
            return {
                id: assay.name,
                text:assay.name,
                start_date: this.getDate(assay.startDate),
                duration: this.getDifferenceInDays(assay.startDate,assay.finishDate),
                progress: 0,
                color: this.getTaskColor(assay.status)
            }
        })
    }

    getTaskColor(state:string){
        switch(state){
            case 'ACTIVE':
                return '#6dcefd'
            case 'FINISHED':
                return '  #9af88e'
            case 'ARCHIVED':
                return '  #fbb0a1';
            default: break;
        }
    }

    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }

    render(){

        return (
            !this.state.loading && 
                <div className="gantt-container">
                    <Toolbar zoom={this.state.currentZoom}
                            onZoomChange={this.handleZoomChange}
                            />
                    <Ganttdhtmlx tasks={this.getTasks()}
                                  zoom={this.state.currentZoom}/>
                </div>
        )
    }
}

export default Gantt;
