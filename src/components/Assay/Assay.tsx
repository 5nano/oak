import * as React from 'react'
import AssayForm from './components/Form/AssayForm';
import { IValues } from '../Form/Form';
import Treatments from './components/Treatments/Treatments';
import TreatmentForm from './components/Form/TreatmentForm';
import Stepper from '../Utilities/Stepper';
import { RouteComponentProps } from 'react-router-dom';
import ITreatment from '../../Interfaces/ITreatment';
import TreatmentQrs from '../Qrs/TreatmentQr/TreatmentQrs';
import BushService from '../../services/bush';
import Error from '../Utilities/Messages/Error';
import Button from '../Utilities/Buttons/DefaultButton/Button';

export interface IAssayProps extends RouteComponentProps{

}

export interface IAssay{
  id:Number,
  name:string,
  description:string,
  idCrop:Number,
  idAgrochemical:Number,
  idMix:Number
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
    fieldsOptions:IFieldsOptions,
    treatments: ITreatment[],
    error:string
  }


export interface IFieldsOptions{
    cropOptions:[string,Number][],
    agrochemicalOptions:[string,Number][],
    mixsOptions:[string,Number][]
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
              idAgrochemical:null,
              idMix:null
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
            fieldsOptions: {
                cropOptions:[],
                agrochemicalOptions:[],
                mixsOptions:[]
            },
            treatments: [],
            error: ''
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

    componentDidMount(){
        this.setLoading();
        BushService.get('/cultivos')
          .then(data=> {
              
            Object.keys(data).forEach(key => {
              this.state.fieldsOptions.cropOptions.push([data[key].name,data[key].idCrop])
            })
            
            this.setState(prevState => {
              let loading = {...prevState.loading}
              loading.crops = false
              return {loading}
            })
          })

        BushService.get('/agroquimicos')
          .then(data=> {
            Object.keys(data).forEach(key => {
                this.state.fieldsOptions.agrochemicalOptions.push([data[key].name,data[key].idAgrochemical])
            })
            this.setState(prevState => {
              let loading = {...prevState.loading}
              loading.agrochemicals = false
              return {loading}
            })
          })
        
        BushService.get('/mezclas')
          .then(data=> {
            Object.keys(data).forEach(key => {
              this.state.fieldsOptions.mixsOptions.push([data[key].name,data[key].idMixture])
            })
            this.setState(prevState => {
              let loading = {...prevState.loading}
              loading.mixs= false
              return {loading}
            })
          })
    
      }



 submitAssayForm=(values:IValues,setError:Function):void=>{
     

      let idAgrochemical = this.state.fieldsOptions.agrochemicalOptions.filter(option => option[0] === values.agrochemical).pop()[1]
      let idCrop = this.state.fieldsOptions.cropOptions.filter(option => option[0] === values.crop).pop()[1]
      let idMix = this.state.fieldsOptions.mixsOptions.filter(option => option[0] === values.mix).pop()[1]


      const assayData = {
         idCrop:idCrop,
         name:values.name,
         description:values.description,
         idUserCreator:1
       }

       BushService.post('/ensayos/insertar', assayData)
         .then(data => {
           console.log(data)
            let assayId = data["idAssay"]
            let newAssay = {
              id:assayId,
              name:values.name,
              description: values.description,
              idCrop: idCrop,
              idAgrochemical: idAgrochemical,
              idMix: idMix
            }
            this.setState({assay:newAssay,successAssay:true})
        })
        .catch(error => {
          console.log(error)
          error.json()
               .then((error: any) => setError({error:error.message}))
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
                <div className="form-wrapper">
                    <div className="form-content">
                        {this.state.error.length>0 &&
                          <Error message={this.state.error}/>
                        }
                        <AssayForm submitAssayForm={this.submitAssayForm}
                                    fieldsOptions={this.state.fieldsOptions}
                                    />
                    </div>
                  </div>
              }

              {!this.state.qrRequest.flag && this.state.successAssay && (
                [<Treatments treatments={this.state.treatments}
                            idAgrochemical={this.state.assay.idAgrochemical}
                            idMixture={this.state.assay.idMix}
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