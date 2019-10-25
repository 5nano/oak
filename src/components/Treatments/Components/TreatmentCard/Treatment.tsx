import * as React from 'react'
import ITreatment from '../../../../Interfaces/ITreatment';
import Button from '../../../Utilities/Buttons/DefaultButton/Button';


export  interface ITreatmentProps{
    treatment:ITreatment,
}


const Treatment:React.SFC<ITreatmentProps> = (props) => {

    const {treatment} = props;

    return(
        <div className="treatment-card">

            <div className="treatment-attribute">
                <div className="title">
                    Etiqueta
                </div>

                <div className="content">
                    {treatment.name}
                </div>
            </div>

            <div className="treatment-attribute">
                <div className="title">
                    Agroquimico
                </div>

                <div className="content">
                    {treatment.agrochemical}
                </div>
            </div>

            <div className="treatment-attribute">
                <div className="title">
                    Mezcla
                </div>

                <div className="content">
                    {treatment.mix}
                </div>
            </div>

            <div className="treatment-attribute">
                <div className="title">
                    Presión
                </div>

                <div className="content">
                    {treatment.pressure}
                </div>
            </div>

            <div className="treatment-attribute">
                <div className="title">
                    Plantas
                </div>

                <div className="content">
                    {treatment.experimentsLength}
                </div>
            </div>

        </div>
    )
}

export default Treatment;