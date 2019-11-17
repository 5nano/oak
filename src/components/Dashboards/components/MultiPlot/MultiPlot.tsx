import * as React from 'react';
import BoxPlot from '../BoxPlot/BoxPlot';
import LinearPlot from '../LinearPlot/LinearPlot';
import BushService from '../../../../services/bush';
import Loader from "../../../Utilities/Loader/Loader";

const BOX = 'box';
const LINEAR = 'linear';

const plots = {
    [BOX]: BoxPlot,
    [LINEAR]: LinearPlot,
};

type Treatment = {
    idTreatment: number,
    name: string,
    description: string
}

const MultiPlot = (props) => {

    const [ currentPlot, setPlot ] = React.useState(LINEAR);
    const treatments = props.data[LINEAR] && props.data[LINEAR].treatments;
    const [linearTreatmentShown, updateLinearTreatmentShown] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleTreatmentSelection = (event) => {
        event.preventDefault && event.preventDefault();
        setLoading(true);
        updateLinearTreatmentShown(event.target.value);
        props.onLinearChange(event.target.value)
            .then(() => setLoading(false));
    }

    const changePlot = (event) => {
        event.preventDefault && event.preventDefault();
        setPlot(event.target.value);
        handleTreatmentSelection({target: {value: treatments[0].idTreatment}}); // So we get data from default option
    }
    
    const PlotToRender = plots[currentPlot];

    const data = currentPlot === LINEAR ? 
        (props.data[LINEAR].values[linearTreatmentShown] || (!loading && props.data[LINEAR].firstTreatmentData)) : 
        props.data[BOX];

    const experimentHasNoData = !(data && Object.values(data).filter((arr: Array<any>) => arr.length).length) && !loading;

    if (!data) return props.onEmptyRender();
    
    return (
        <div className="MultiPlot">
            <div className="select-plot-type">
                {
                    props.showPlotOptions && [
                        <p className="description">Tipo de gráfica</p>,
                        <select onChange={changePlot}>
                            <option value={BOX}>Box Plot</option>
                            <option value={LINEAR}>Linear Plot</option>
                        </select>
                    ]
                }
                {
                    currentPlot === LINEAR && treatments && [
                        <p className="description">Tratamiento</p>,
                        <select onChange={handleTreatmentSelection}>
                            {
                                treatments.map((treatment) => (
                                    <option value={treatment.idTreatment} key={treatment.idTreatment}> {treatment.name} </option>
                                ))
                            }
                        </select>
                    ]
                }
            </div>
            
            {
                !data && loading && 
                    <div style={{display:'flex',width:'100%',justifyContent:'center',paddingTop: 80}}>
                        <Loader/>
                    </div>
            }

            {
                experimentHasNoData ? 
                props.onEmptyRender(null, null, "El tratamiento seleccionado no contiene experimentos con imágenes")
                :
                <PlotToRender {...props} data={data} />
            }
        </div>
    )
}

export default MultiPlot;