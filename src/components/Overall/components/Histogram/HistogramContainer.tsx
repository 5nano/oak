import * as React from 'react';
import ChartContainer from '../ChartContainer.tsx/ChartContainer';
import Histogram from './Histogram';


const HistogramContainer:React.SFC = (props) => {

    return(
        <ChartContainer title="Histograma de imágenes capturadas por ensayo" chart={Histogram}/>
    )
}

export default HistogramContainer;