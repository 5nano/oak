import * as React from 'react';
import ChartContainer from '../ChartContainer.tsx/ChartContainer';
import Sankey from './Sankey';


const SankeyContainer:React.SFC = (props) => {

    return(
        <ChartContainer title="Flujo de componentes" chart={Sankey}/>
    )
}

export default SankeyContainer;