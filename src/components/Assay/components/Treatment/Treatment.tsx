import * as React from 'react'
import ITreatment from '../../../../Interfaces/ITreatment';
import Button from '../../../Utilities/Buttons/DefaultButton/Button';


export  interface ITreatmentProps{
    treatment:ITreatment,
    setQrRequest:(treatmentName:string) => void
}


const Treatment:React.SFC<ITreatmentProps> = (props) => {

    const {treatment,setQrRequest} = props;

    return(
        <div className="treatment-card">

            <div className="treatment-card-header">
                <div className="title">
                    Etiqueta
                </div>

                <div className="content">
                    {treatment.name}
                </div>
            </div>

            <div className="treatment-card-content">
                <div className="title">
                    Plantas
                </div>

                <div className="content">
                    {treatment.experimentsLength}
                </div>
            </div>

            <Button title="QR" 
                    onClick={()=> setQrRequest(treatment.name)}
            /> 
        </div>
    )
}

export default Treatment;