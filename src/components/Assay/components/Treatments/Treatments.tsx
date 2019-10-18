import * as React from 'react';
import Treatment from '../Treatment/Treatment';
import ITreatment from '../../../../Interfaces/ITreatment';
import TreatmentForm from '../Form/TreatmentForm';
import { IValues } from '../../../Form/Form';
import BushService from '../../../../services/bush';
import Button from '../../../Utilities/Buttons/DefaultButton/Button';

export  interface ITreatmentsProps{
    idAssay: Number
}
const Treatments: React.SFC<ITreatmentsProps> = (props) => {

    const [newTreatment,setNewTreatment] = React.useState(false)
    const [treatments,setTreatments] = React.useState<ITreatment[]>([])
    const {idAssay} = props


    const setTreatment = (treatment:ITreatment) => {
        treatments.push(treatment)
       }
    
    const submitTreatmentForm=(values:IValues):Promise<boolean>=>{
        const treatmentData = {
          idAssay:idAssay,
          name:values.name,
          description:values.description,
          pressure: values.pressure,
          experimentsLength:values.experimentsLength,
          idMixture: values.mix.id,
          idAgrochemical: values.agrochemical.id
        }
    
        let treatment:ITreatment = {
         name:treatmentData.name,
         description:treatmentData.description,
         pressure:treatmentData.pressure,
         experimentsLength:treatmentData.experimentsLength,
         mixture:values.mix,
         agrochemical: values.agrochemical,
         qrs:[]
         };
    
         return BushService.post('/tratamientos/insertar', treatmentData)
            .then(data => {
                Object.keys(data.experimentsQR).forEach(key=>{
                    treatment.qrs.push(data.experimentsQR[key])
                })
                setTreatment(treatment)
                setNewTreatment(false)
                return true
            })
      }
        return(
            <div className="treatments">

                <div className="treatments-title">
                    Tratamientos
                </div>

                <div className="treatments-wrapper">
                    {treatments.map((treatment)=> (
                        <Treatment treatment={treatment}/>
                    ))}
                </div>

                <div className="new-treatment-button">
                    <Button title="Nuevo Tratamiento" 
                            onClick={()=> setNewTreatment(!newTreatment)}/>    
                </div>

                {newTreatment && 
                <div className="form-wrapper">
                    <div className="form-content">
                        <TreatmentForm submitTreatmentForm={submitTreatmentForm}/>
                    </div>
                </div>
                }
            </div>
        )
}

export default Treatments;