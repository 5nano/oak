import * as React from 'react';
import ChartContainer from '../ChartContainer.tsx/ChartContainer';
import Sunburst from './Sunburst';


const SunburstContainer:React.SFC = (props) => {

    return(
        <ChartContainer title="Relación mezclas/agroquímicos" chart={Sunburst}/>
    )
}

export default SunburstContainer;