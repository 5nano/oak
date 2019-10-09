import * as React from 'react';
import Treatment from './Treatment';
import ITreatment from './ITreatment';
import TreatmentForm from '../TreatmentForm';
import { IValues } from '../../Form/Form';


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
    
    const handleTreatmentValues=(values:IValues):void=>{
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
    
        fetch('https://nanivo-bush.herokuapp.com/tratamientos/insertar', {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify(treatmentData),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
             Object.keys(data.experimentsQR).forEach(key=>{
                 treatment.qrs.push(data.experimentsQR[key])
             })
             setTreatment(treatment)
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


                    
                <button type="button" onClick={()=> setNewTreatment(!newTreatment)}>
                    Nuevo tratamiento
                </button>


                {newTreatment && 
                    <TreatmentForm handleValues={handleTreatmentValues}/>
                }
            </div>
        )
}

export default Treatments;