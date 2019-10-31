import * as React from 'react';
import Treatment from './Components/TreatmentCard/Treatment';
import  { ITreatmentBackend, ITreatment } from '../../Interfaces/ITreatment';
import TreatmentForm from './Components/Form/TreatmentForm';
import BushService from '../../services/bush';
import Button from '../Utilities/Buttons/DefaultButton/Button';
import Info from '../Utilities/Messages/Info';
import Loader from '../Utilities/Loader/Loader';
import { IEnsayo } from '../../Interfaces/IEnsayo';

export  interface ITreatmentsProps{
        match: {
          params: { assayId: string },
        },
}
const Treatments: React.SFC<ITreatmentsProps> = (props) => {

    const [newTreatment,setNewTreatment] = React.useState(false)
    const [treatments,setTreatments] = React.useState<Array<ITreatment>>([])
    const [loading,setLoading] = React.useState(true)
    const [assay,setAssay] = React.useState<string>('')
    const idAssay = parseInt(props.match.params.assayId)


    React.useEffect(()=>{
        fetchAssay().then(()=>{
            fetchTreatments()
        })
    },[])

    const fetchTreatments = ():Promise<void> => {
         setLoading(true)
         return BushService.get(`/ensayo/tratamientos?idAssay=${idAssay}`)
                   .then((data:Array<ITreatment>)=>{
                       setTreatments(data)
                       setLoading(false)
                    })
    }

    const fetchAssay = ():Promise<void> => {
        return BushService.get(`/ensayo/?idAssay=${idAssay}`)
                  .then((data:IEnsayo)=>{
                      setAssay(data.name)
                   })
   }

   
    const submitTreatmentForm=(newTreatment:ITreatmentBackend):Promise<void>=>{
         return BushService.post('/tratamientos/insertar', newTreatment)
            .then(() => {
                fetchTreatments()
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
                            treatments.map((treatment:ITreatment)=> (
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
                                <TreatmentForm submitTreatmentForm={submitTreatmentForm}
                                                idAssay={idAssay}/>
                        </div>
                    }

                </div>
            }

            </div>
        )
}

export default Treatments;