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
    qrRequest: {
      flag:boolean,
      treatmentName:string
    }
    loading:{
      agrochemicals:boolean,
      mixs:boolean,
      crops:boolean
    },
    treatments: ITreatment[],
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
            qrRequest: {
              flag:false,
              treatmentName:''
            },
            loading: {
              agrochemicals:true,
              mixs:true,
              crops:true,
            },
            treatments: [],
          }

          this.setTreatment=this.setTreatment.bind(this)
          this.setQrRequest=this.setQrRequest.bind(this)
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

     setTreatment(treatment:ITreatment){
      this.setState(prevState => {
        let treatments = prevState.treatments
        treatments.push(treatment)
        return {treatments}
        })
     }

     setQrRequest(treatmentName:string){
        this.setState(prevState => {
          let qrRequest = {flag:true,treatmentName:treatmentName}
          return {qrRequest}
        })
     }
   
    render(){
        return(
            <div className="crud-container">
               
              <div className="crud-title">
                {this.state.successAssay? 'Ensayos/Tratamientos':'Ensayos'}
              </div>

              {!this.state.qrRequest.flag && !this.state.successAssay && 
                <div className="assay-form-wrapper">
                        <AssayForm submitAssayForm={this.submitAssayForm.bind(this)}/>
                  </div>
              }

              {!this.state.qrRequest.flag && this.state.successAssay && (
                [<Treatments treatments={this.state.treatments}
                            idAssay={this.state.assay.id}
                            setTreatment={this.setTreatment}
                            setQrRequest={this.setQrRequest}
                />,
                <div className="step-button">
                  <Button title="Finalizar" onClick={()=>this.props.history.push('/')}/>
                </div>
                ]
              )}
        
              {this.state.qrRequest.flag &&
                <div className="qr-wrapper">
                  <TreatmentQrs treatment={this.state.treatments.find(treatment => treatment.name === this.state.qrRequest.treatmentName)}/>
                  <button type="button" onClick={()=>this.setState({qrRequest:{flag:false,treatmentName:''}})}>
                            Atras
                  </button>
                </div>
              }
            </div>
        )
    }
}

export default Assay;