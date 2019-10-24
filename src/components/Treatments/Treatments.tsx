import * as React from 'react';
import Treatment from './Components/TreatmentCard/Treatment';
import ITreatment from '../../Interfaces/ITreatment';
import TreatmentForm from './Components/Form/TreatmentForm';
import { IValues } from '../Form/Form';
import BushService from '../../services/bush';
import Button from '../Utilities/Buttons/DefaultButton/Button';

export  interface ITreatmentsProps{
        match: {
          params: { assayId: string },
        },
}
const Treatments: React.SFC<ITreatmentsProps> = (props) => {

    const [newTreatment,setNewTreatment] = React.useState(false)
    const [treatments,setTreatments] = React.useState<Array<ITreatment>>([])
    const idAssay = props.match.params.assayId

    React.useEffect(()=>{
        BushService.get(`/ensayo/tratamientos?idAssay=${idAssay}`)
                   .then((data:Array<ITreatment>)=>setTreatments(data)) 
    },[])

    const setTreatment = (treatment:ITreatment) => {
        treatments.push(treatment)
       }
    
    const submitTreatmentForm=(newTreatment:ITreatment):Promise<boolean>=>{
        const treatmentData = {
          idAssay:idAssay,
          name:newTreatment.name,
          description:newTreatment.description,
          pressure: newTreatment.pressure,
          experimentsLength:newTreatment.experimentsLength,
          idMixture: newTreatment.mix.id,
          idAgrochemical: newTreatment.agrochemical.id
        }
    
        newTreatment.qrs=[]

         return BushService.post('/tratamientos/insertar', treatmentData)
            .then(data => {
                Object.keys(data.experimentsQR).forEach(key=>{
                    newTreatment.qrs.push(data.experimentsQR[key])
                })
                setTreatment(newTreatment)
                setNewTreatment(false)
                return true
            })
      }
        return(
            <div className="crud-container">

                <div className="crud-title">
                 Ensayo/Tratamientos
                </div>

                {!newTreatment?
                    ([<div className="treatments-wrapper">
                        {treatments.map((treatment)=> (
                            <Treatment treatment={treatment}/>
                        ))}
                    </div>
                    ,
                    <div className="new-treatment-button">
                        <Button title="Nuevo Tratamiento" 
                                onClick={()=> setNewTreatment(!newTreatment)}/>    
                    </div>])
                :
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