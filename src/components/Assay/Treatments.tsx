import * as React from 'react';

export interface ITreatmentsProps{
    treatments: Treatment[]
}

export interface Treatment{
    experimentsLength: Number,
    name:string,
    description:string
}
export interface ITreatmentsState{
    treatments:Treatment[]
}


const Treatments: React.SFC<ITreatmentsProps> = (props) => {

        return(
            <div className="treatments">

                <div className="treatments-title">
                    Tratamientos
                </div>

                <div className="treatments-wrapper">
                    {props.treatments.map((treatment,i)=> (
                        <div key={i} className="treatment-card">
                            <div className="treatment-tag">
                                {treatment.name}
                            </div>
                            <div className="treatment-tests">
                                {treatment.experimentsLength}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
}

export default Treatments;