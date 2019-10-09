import * as React from 'react'
import AssayForm from './Form/AssayForm';
import { IValues } from '../Form/Form';
import Treatments from './components/Treatments';
import TreatmentForm from './TreatmentForm';
import Stepper from '../Utilities/Stepper';
import { RouteComponentProps } from 'react-router-dom';
import ITreatment from './components/ITreatment';
import TreatmentQrs from '../Qrs/TreatmentQr/TreatmentQrs';


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
    treatments: ITreatment[]
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
            treatments: []
          }

          this.setTreatment=this.setTreatment.bind(this)
          this.setQrRequest=this.setQrRequest.bind(this)
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
        fetch('https://nanivo-bush.herokuapp.com/cultivos', {
          method: "GET",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }).then(response => {return response.json()})
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
        
        fetch('https://nanivo-bush.herokuapp.com/agroquimicos', {
          method: "GET",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }).then(response => {return response.json()})
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
        
    
        fetch('https://nanivo-bush.herokuapp.com/mezclas', {
          method: "GET",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }).then(response => {return response.json()})
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



 handleAssayValues=(values:IValues):void=>{
     

      let idAgrochemical = this.state.fieldsOptions.agrochemicalOptions.filter(option => option[0] === values.agrochemical).pop()[1]
      let idCrop = this.state.fieldsOptions.cropOptions.filter(option => option[0] === values.crop).pop()[1]
      let idMix = this.state.fieldsOptions.mixsOptions.filter(option => option[0] === values.mix).pop()[1]


      const assayData = {
         idCrop:idCrop,
         name:values.name,
         description:values.description,
         idUserCreator:1
       }

       fetch('https://nanivo-bush.herokuapp.com/ensayos/insertar', {
         method: "POST",
         mode: 'cors',
         body: JSON.stringify(assayData),
         headers: {
           'Content-Type': 'application/json',
           Accept: 'application/json'
         }
       }).then(response => response.json())
         .then(data => {
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
               
                    <div className="title-wrapper">
                    <img src="../../assets/images/head-icon.png"/>
                    <p>Ensayos</p>
                    </div>

                    {!this.state.qrRequest.flag?

                    <div className="assay-wrapper">

                    {!this.state.successAssay && 
                    
                        <div className="assay-container">
                            <Stepper description="Agregue los datos del nuevo ensayo"/>
                            <AssayForm handleValues={this.handleAssayValues}
                                       fieldsOptions={this.state.fieldsOptions}
                                       />
                        </div>
                    }

                    {this.state.successAssay && (
                        <div className="treatments-container">
                            <Stepper description="Agregue los tratamientos"/>
                            <Treatments treatments={this.state.treatments}
                                        idAgrochemical={this.state.assay.idAgrochemical}
                                        idMixture={this.state.assay.idMix}
                                        idAssay={this.state.assay.id}
                                        setTreatment={this.setTreatment}
                                        setQrRequest={this.setQrRequest}
                                       /> 
                            <button type="button" onClick={()=>this.props.history.push('/')}>
                                Finalizar
                            </button>
                        </div>
                    )}

                    </div>
                    :
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