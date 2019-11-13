import * as React from 'react'
import {ITreatment} from '../../../../Interfaces/ITreatment';
export  interface ITreatmentProps{
    treatment:ITreatment
    onDelete:(idTreament:Number) => Promise<void>
}
const Treatment:React.SFC<ITreatmentProps> = (props) => {

    const {treatment,onDelete} = props;

    return(
        <div className="treatment-container">
            <div className="treatment">
                <div className="treatment-header">
                    <div className="title">
                        {treatment.name}
                    </div>
                    <div className="delete">
                        <a onClick={()=>onDelete(treatment.idTreatment)}>
                            <i className="icon icon-trash"/> 
                        </a>
                    </div>
                </div>

                <div className="treatment-attribute">
                    <img src='../../../../assets/images/agrochemical-icon.png'/>
                    <div className="content">
                        {treatment.agrochemical.name}
                    </div>
                </div>

                <div className="treatment-attribute">
                    <img src='../../../../assets/images/mix-icon.png'/>
                    <div className="content">
                    {treatment.mixture.name}
                    </div>
                </div>

                <div className="treatment-footer">
                    <div className="footer">
                        <i className="icon icon-gauge"/>
                        <p>{treatment.pressure} [bar]</p>
                    </div>

                    <div className="footer">
                        <i className="icon icon-plant-icon"/>
                        <p>{treatment.experimentsLength} [u]</p>
                        
                    </div>
                </div>
                

            </div>
        </div>
    )
}

export default Treatment;