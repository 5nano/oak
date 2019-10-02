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
                {props.treatments.map((treatment,i)=> (
                    <div key={i} className="treatment-card">
                        <div className="treatment-tag">
                            {treatment.tag}
                        </div>
                        <div className="treatment-tests">
                            {treatment.tests}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Treatments;