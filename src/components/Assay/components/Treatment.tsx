import * as React from 'react'
import { ITreatmentProps } from './ITreatment'

const Treatment:React.SFC<ITreatmentProps> = (props) => {

    const {treatment} = props;

    return(
        <div  className="treatment-card">
            <div className="treatment-tag">
                {treatment.name}
            </div>
            <div className="treatment-tests">
                {treatment.experimentsLength}
            </div>
        </div>
    )
}

export default Treatment;