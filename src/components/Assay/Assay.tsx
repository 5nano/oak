import * as React from 'react'
import AssayForm from './components/Form/AssayForm';
import { IValues } from '../Form/Form';
import { RouteComponentProps } from 'react-router-dom';
import ITreatment from '../../Interfaces/ITreatment';
import TreatmentQrs from '../Qrs/TreatmentQr/TreatmentQrs';
import BushService from '../../services/bush';
import Button from '../Utilities/Buttons/DefaultButton/Button';
import Treatments from './components/Treatments/Treatments';

export interface IAssayProps extends RouteComponentProps{

}

export interface IAssay{
  id:Number,
  name:string,
  description:string,
  idCrop:Number,
}

export interface IAssayState{
    assay:IAssay
    successAssay: boolean,
    loading:{
      agrochemicals:boolean,
      mixs:boolean,
      crops:boolean
    }
  }


class Assay extends React.Component<IAssayProps,IAssayState> {
    
    constructor(props:IAssayProps){
        super(props)

        this.state = {
            assay: {
              id:null,
              name:'',
              description:'',
              idCrop: null,
            },
            successAssay: false,
            loading: {
              agrochemicals:true,
              mixs:true,
              crops:true,
            }
          }
        
         this.submitAssayForm=this.submitAssayForm.bind(this)
    }

    setLoading(){
        this.setState(prevState => {
            let loading = {...prevState.loading}
            loading.crops = true
            loading.agrochemicals = true
            loading.mixs = true
            return {loading}
        })
    }
 submitAssayForm=(values:IValues):Promise<boolean> => {
      const assayData = {
         idCrop:values.crop.id,
         name:values.name,
         description:values.description,
         idUserCreator:1
       }

       return BushService.post('/ensayos/insertar', assayData)
         .then(data => {
            let assayId = data["idAssay"]
            let newAssay = {
              id:assayId,
              name:values.name,
              description: values.description,
              idCrop: values.crop,
            }
            this.setState({assay:newAssay,successAssay:true})
            return true;
        })
     }

     goToTreatments(){
        this.props.history.push(`/assay/${this.state.assay.id}/treatments`)
     }

    render(){
        return(
            <div className="crud-container">
                <div className="assay-form-wrapper">
                        <AssayForm submitAssayForm={this.submitAssayForm.bind(this)}/>
                </div>

              <Button title="Ingresar tratamientos" 
                      onClick={()=>this.goToTreatments()}
                      />
            </div>
        )
    }
}

export default Assay;