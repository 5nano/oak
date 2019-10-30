import * as React from 'react';
import Treatment from './Components/TreatmentCard/Treatment';
import ITreatment from '../../Interfaces/ITreatment';
import TreatmentForm from './Components/Form/TreatmentForm';
import BushService from '../../services/bush';
import Button from '../Utilities/Buttons/DefaultButton/Button';
import Info from '../Utilities/Messages/Info';
import Loader from '../Utilities/Loader/Loader';

export  interface ITreatmentsProps{
        match: {
          params: { assayId: string },
        },
}
const Treatments: React.SFC<ITreatmentsProps> = (props) => {

    const [newTreatment,setNewTreatment] = React.useState(false)
    const [treatments,setTreatments] = React.useState<Array<ITreatment>>([])
    const [loading,setLoading] = React.useState(true)
    const idAssay = props.match.params.assayId


    React.useEffect(()=>{
        fetchTreatments()
    },[])

    const fetchTreatments = ():Promise<boolean> => {
         setLoading(true)
         return BushService.get(`/ensayo/tratamientos?idAssay=${idAssay}`)
                   .then((data:Array<ITreatment>)=>{
                       console.log(data)
                       setTreatments(data)
                       setLoading(false)
                       return true
                    })
    }

   
    const submitTreatmentForm=(newTreatment:ITreatment):Promise<boolean>=>{
        const treatmentData = {
          idAssay:idAssay,
          name:newTreatment.name,
          description:newTreatment.description,
          pressure: newTreatment.pressure,
          experimentsLength:newTreatment.experimentsLength,
          idMixture: newTreatment.mix.idMixture,
          idAgrochemical: newTreatment.agrochemical.idAgrochemical
        }
    
         return BushService.post('/tratamientos/insertar', treatmentData)
            .then(data => {
                Object.keys(data.experimentsQR).forEach(key=>{
                    newTreatment.qrs.push(data.experimentsQR[key])
                })
                fetchTreatments()
                return true;
            })
      }
        return(
            <div className="crud-container">

                <div className="crud-title">
                 Ensayo {idAssay}/Tratamientos
                </div>

                {loading
                ? 
                    <Loader/>
                :
                <div className="layout-wrapper">
                    <div className="search-container">
                        <div className="results-list">
                            {treatments.length===0? 
                            <Info message="No existen tratamientos"/>
                            :
                            treatments.map((treatment)=> (
                                <Treatment treatment={treatment}/>
                            ))
                        }
                        </div>
                        <Button title="Nuevo Tratamiento"
                                disabled={newTreatment}
                                onClick={()=> setNewTreatment(true)}/>    
                    </div>
                    {newTreatment && 
                        <div className="form-crud-wrapper">
                            <div className="form-cancel" onClick={()=>setNewTreatment(false)}>
                                <i className="icon icon-left-open"/>
                             </div>
                                <TreatmentForm submitTreatmentForm={submitTreatmentForm}/>
                           
                            
                        </div>
                    }

                </div>
            }

            </div>
        )
}

export default Treatments;