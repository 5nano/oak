import * as React from 'react';
import Treatment from './Components/TreatmentCard/Treatment';
import  { ITreatmentBackend, ITreatment } from '../../Interfaces/ITreatment';
import TreatmentForm from './Components/Form/TreatmentForm';
import BushService from '../../services/bush';
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
        fetchAssay()
    },[])

    const fetchTreatments = ():Promise<void> => {
         setLoading(true)
         return BushService.get(`/ensayo/tratamientos?idAssay=${idAssay}`)
                   .then((data:Array<ITreatment>)=>{
                       console.log(data)
                       setTreatments(data)
                       setLoading(false)
                    })
    }

    const fetchAssay = ():Promise<void> => {
        return BushService.get(`/ensayo/?idAssay=${idAssay}`)
                  .then((data:IEnsayo)=>{
                      console.log(data)
                      setAssay(data.name)
                      fetchTreatments()
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

            {!loading?
                [<div className="crud-title">
                 <h1>Tratamientos</h1>
                 <h2>Ensayo {assay}</h2>
                </div>
                ,
                <div className="layout-wrapper">
                    <div className="treatments-container">
                        <div className="treatments-wrapper">
                            <div className="empty-treatment" onClick={()=>setNewTreatment(true)}>
                                <img src="../../../../assets/images/plus-icon.png"/>
                            </div>
                            {treatments.length!=0 &&
                            treatments.map((treatment:ITreatment)=> (
                                 <Treatment treatment={treatment}/>
                            ))
                            }
                        </div>
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

                </div>]
            :
            <Loader/>
                }
            </div>
        )
}

export default Treatments;