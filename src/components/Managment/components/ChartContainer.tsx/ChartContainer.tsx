import * as React from 'react';

interface IChartContainerProps{
    chart:any,
    title:string
}

const ChartContainer:React.SFC<IChartContainerProps> = (props) => {

    const {title,chart:Chart} = props;
    return(
        <div className='chart-container'>
            <div className="chart-title">
                <h1>{title}</h1>
            </div>
            <Chart/>
        </div>
    )
}

export default ChartContainer;