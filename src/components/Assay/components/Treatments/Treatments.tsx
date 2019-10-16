import * as React from 'react';
import Treatment from '../Treatment/Treatment';
import ITreatment from '../../../../Interfaces/ITreatment';
import TreatmentForm from '../Form/TreatmentForm';
import { IValues } from '../../../Form/Form';
import BushService from '../../../../services/bush';
import Button from '../../../Utilities/Buttons/DefaultButton/Button';

export  interface ITreatmentsProps{
    treatments: ITreatment[],
    idMixture: Number,
    idAgrochemical: Number,
    idAssay: Number,
    setTreatment: (treatment:ITreatment) => void;
    setQrRequest:(treatmentName:string) => void;
}


const Treatments: React.SFC<ITreatmentsProps> = (props) => {

    const [newTreatment,setNewTreatment] = React.useState(false)
    const {treatments,
           idAgrochemical,
           idMixture,
           idAssay,
           setTreatment,
           setQrRequest} = props
    
    const submitTreatmentForm=(values:IValues,setError:Function):void=>{
        console.log(values)
    
        const treatmentData = {
          idAssay:idAssay,
          name:values.name,
          description:values.description,
          experimentsLength:values.experimentsLength,
          idMixture: values.mix? idMixture:null,
          idAgrochemical: values.agrochemical? idAgrochemical:null
        }
    
        let treatment:ITreatment = {
         name:treatmentData.name,
         description:treatmentData.description,
         experimentsLength:treatmentData.experimentsLength,
         qrs:[]
         };
    
         BushService.post('/tratamientos/insertar', treatmentData)
            .then(data => {
                Object.keys(data.experimentsQR).forEach(key=>{
                    treatment.qrs.push(data.experimentsQR[key])
                })
                setTreatment(treatment)
                setNewTreatment(false)
            })

      }
    

        return(
            <div className="treatments">

                <div className="treatments-title">
                    Tratamientos
                </div>

                <div className="treatments-wrapper">
                    {treatments.map((treatment)=> (
                        <Treatment treatment={treatment}
                                   setQrRequest={setQrRequest}/>
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