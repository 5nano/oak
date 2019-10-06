import * as React from 'react';
import Treatment from './Treatment';

export interface ITreatment{
    experimentsLength: Number,
    name:string,
    description:string
    qrs:any
}
export interface ITreatmentsProps{
    treatments: ITreatment[]
}

const Treatments: React.SFC<ITreatmentsProps> = (props) => {

        return(
            <div className="treatments">

                <div className="treatments-title">
                    Tratamientos
                </div>

                <div className="treatments-wrapper">
                    {props.treatments.map((treatment)=> (
                        <Treatment treatment={treatment}/>
                    ))}
                </div>

            </div>
        )
}

export default Treatments;