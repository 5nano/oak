import * as React from 'react';
import { IValues } from '../Form/Form';


export interface ITreatments{
    treatments: Array<IValues>
}

const Treatments:React.SFC<ITreatments> = (props) => {

    return(
        <div className="treatments">

            <div className="treatments-title">
                Tratamientos
            </div>

            <div className="treatments-wrapper">
                {props.treatments.map(treatment=> (
                    <div className="treatment-card">
                        <div className="treatment-title">
                            {treatment.tag}
                        </div>
                        <p>{treatment.tests}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Treatments;