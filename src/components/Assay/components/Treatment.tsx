import * as React from 'react'
import ITreatment from './ITreatment';


export  interface ITreatmentProps{
    treatment:ITreatment,
    setQrRequest:(treatmentName:string) => void
}


const Treatment:React.SFC<ITreatmentProps> = (props) => {

    const {treatment,setQrRequest} = props;

    return(
        <div  className="treatment-card">
            <div className="treatment-tag">
                {treatment.name}
            </div>
            <div className="treatment-tests">
                {treatment.experimentsLength}
            </div>
            <button type="button" 
                    onClick={()=>setQrRequest(treatment.name)}>
            QR's
            </button>   
        </div>
    )
}

export default Treatment;