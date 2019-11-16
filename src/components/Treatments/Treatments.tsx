import * as React from 'react';
import Treatment from './Components/TreatmentCard/Treatment';
import  { ITreatmentBackend, ITreatment } from '../../Interfaces/ITreatment';
import TreatmentForm from './Components/Form/TreatmentForm';
import BushService from '../../services/bush';
import Loader from '../Utilities/Loader/Loader';
import { IEnsayo } from '../../Interfaces/IEnsayo';
import MySnackbarContentWrapper, { Feedback } from '../Feedback/MySnackbarContentWrapper';
import { Snackbar } from '@material-ui/core';

export  interface ITreatmentsProps{
        match: {
          params: { assayId: string },
        },
}
const Treatments: React.SFC<ITreatmentsProps> = (props) => {

    const [newTreatment,setNewTreatment] = React.useState(false)
    const [feedback,setFeedback] = React.useState<Feedback>(null)
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
                      
                       setTreatments(data)
                       setLoading(false)
                    })
    }

    const fetchAssay = ():Promise<void> => {
        return BushService.get(`/ensayo/?idAssay=${idAssay}`)
                  .then((data:IEnsayo)=>{
                      
                      setAssay(data.name)
                      fetchTreatments()
                   })
   }

   
    const submitTreatmentForm=(newTreatment:ITreatmentBackend):Promise<void>=>{
       
        return BushService.post('/tratamientos/insertar', newTreatment)
            .then(() => {
                fetchTreatments()
                setFeedback({variant:'success',message:'El tratamiento fue creado exitosamente!'})
            })
            .catch(error=>{
                error.json().then(error=>{
                  setFeedback({variant:'error',message:error.message})
                })
            })
      }

    const deleteTreatment = (treatmentId: number):Promise<void> => {
        return BushService.post(`/tratamientos/eliminar?idTreatment=${treatmentId}`)
                          .then(()=>{
                            fetchTreatments()
                            setFeedback({variant:'success',message:'El tratamiento fue eliminado correctamente!'})
                          })
                          .catch(error=>{
                              error.json().then(error=>{
                                setFeedback({variant:'error',message:error.message})
                              })
                          })
    }

   const handleSnackbarClose = (event?: React.SyntheticEvent,reason?:string) => {
        if (reason ==='clickaway') { 
            return;
        }
        setFeedback(null)
    }
        return(
            <div className="crud-container">
                <div className="crud-wrapper">
               
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
                                        Agregar tratamiento
                                        <p>Crea un tratamiento y configura su aplicación</p>
                                    </div>
                                    {treatments.length!=0 &&
                                    treatments.map((treatment:ITreatment,i)=> (
                                        <Treatment key={i} treatment={treatment}
                                                    onDelete={deleteTreatment}/>
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
                <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={feedback!=null}
                onClose={handleSnackbarClose.bind(this)}
                >
                    <MySnackbarContentWrapper
                        onClose={handleSnackbarClose.bind(this)}
                        variant={feedback? feedback.variant : 'success'}
                        message={feedback? feedback.message:''}/>
                </Snackbar>
            </div>
        )
}

export default Treatments;