
import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { DashboardType } from '../InterfaceDashboardTypes';
import Plot from 'react-plotly.js';
import { Layout } from "plotly.js";
import BushService from '../../../../services/bush';

type AssayParamsType = {
    assayId: string,
}

type AverageTreatment ={
  date: Array<string>,
  value: Array<number>
}
  
interface LinearLeafAreaTreatmentsProps extends RouteComponentProps<AssayParamsType> {
    onEmptyRender: Function,
    data: {
      linear: Array<Array<AverageTreatment>>
      box
    },
    graphPosition?: 'left' | 'right', 
}

const name = "Área Foliar Linear Promediada";

class LinearLeafAreaTreatments extends React.Component<LinearLeafAreaTreatmentsProps> {
   

    static fetchData(assayId: string) {
      return Promise.all([
        BushService.get(`/graficoComparativo/ensayo/tratamientos/promediado?assayId=${assayId}`)
      ])
        .then((linear) => {
          return {
            linear,
            //box
          }
        })
    }

    render() { 

        if (!(this.props.data && this.props.data.linear &&  Object.keys(this.props.data.linear).length)) 
          return this.props.onEmptyRender('linear-leaf-area-treatments',name);
         
        let averageTreatmentsData = this.props.data.linear[0]
        const linearData: Plotly.Data[] = Object.keys(averageTreatmentsData).map(key => {
          let treatmentData = averageTreatmentsData[key]

          let dates = treatmentData.map(data => {return data.date})
          let values = treatmentData.map(data => {return data.value})
          return {
            x: dates,
            y: values,
            type: 'scatter',
            name: key
          }
        })

          const layout: Partial<Layout> = {
              showlegend: true,

            
            xaxis: {
              type: 'date',
              autorange: true,
              rangeselector: {buttons: [
                {
                  count: 7,
                  label: '1w',
                  step: 'day',
                  stepmode: 'todate'
                },
                {
                  count: 1,
                  label: '1m',
                  step: 'month',
                  stepmode: 'backward'
                },
                {step: 'all'}
              ]},
            rangeslider: {},
            },
            yaxis: {
                tickformat: '.3s', // Hasta 3 dígitos
                ticksuffix: " px²",
                showticksuffix: "all"
            },
            autosize: true
          };

        return (
          <div className="plot-graph">
            <h4>{name}</h4>
            <Plot
                data={linearData}
                layout={layout}
                style={{display: 'flex', width: "100%", height: "100%"}}
            />
          </div>
        )
      }
};

const LinearLeafAreaTreatmentsType : DashboardType = {
    id: 'linear-leaf-area-treatments',
    name,
    component: LinearLeafAreaTreatments,
  };
  
  export default LinearLeafAreaTreatmentsType;