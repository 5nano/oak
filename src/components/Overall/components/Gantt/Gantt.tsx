import * as React from 'react';
import BushService from '../../../../services/bush';
import { assayState } from '../../../Home/Home';
import Chart from 'react-google-charts'

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
    loading:boolean
}

class Gantt extends React.Component<IGanttProps,IGanttState> {

    constructor(props){
        super(props)
        this.state = {
            gantt:null,
            loading:true
        }
    }

    componentDidMount(){
        BushService.get('/metricas/ensayos/gantt')
                    .then(data=> {
                        this.setState({gantt:data.jobDTOS,loading:false})
                    })
    }

    getDate(date:string){
        let stringbits = date.split(/\D/);
        let bits = stringbits.map(bit => {return Number(bit)})
        let parsedDate = new Date(bits[0],--bits[1],bits[2],bits[3],bits[4])
        return parsedDate;
    }

    render(){
        const columns = [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ]

        let rows = [];

        if(!this.state.loading){
            this.state.gantt.forEach(assay => {
            let row = [
                assay.name,
                assay.name,
                assay.name,
                this.getDate(assay.startDate),
                this.getDate(assay.finishDate),
                null,
                0,
                null,
              ]
            rows.push(row)
        })
    }

       
        
        return (
            !this.state.loading && 
            <div className="gantt-chart">
                    <Chart 
                        height={400}
                        width={800}
                        chartType='Gantt'
                        loader={<div>Loading Chart</div>}
                        data={[columns,...rows]}
                        options={{
                            gantt: {
                            trackHeight: 30,
                            },
                        }}
                        legendToggle
                        rootProps={{'data-testid':'1'}}/>
            </div>
        )
    }
}

export default Gantt;