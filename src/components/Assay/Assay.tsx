import * as React from 'react'
import AssayForm from './AssayForm';
import { IValues } from '../Form/Form';
import Treatments, { Treatment } from './Treatments';
import TreatmentForm from './TreatmentForm';
import Stepper from '../Utilities/Stepper';

export interface IAssayProps{

}

export interface IAssayState{
    id:Number,
    values:{name:string,
            description:string,
            crop:string,
            agrochemical:string,
            mix:string},
    newTreatment:boolean,
    successAssay: boolean,
    loading:{
      agrochemicals:boolean,
      mixs:boolean,
      crops:boolean
    },
    fieldsOptions:IFieldsOptions,
    treatments: Treatment[]
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
            id:null,
            values: {name:'',
                    description:'',
                    crop:'',
                    agrochemical:'',
                    mix:'',
                    },
            newTreatment: false,
            successAssay: false,
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
     

        let idCrop = this.state.fieldsOptions.cropOptions.filter(option => option[0] === values.crop).pop()[1]
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
            console.log(data)
            this.setState({id:data['idAssay'],successAssay:true})
           
            this.setState({values: {...this.state.values, ...values}});
        })
     }
   
     handleTreatmentValues=(values:IValues):void=>{
       console.log(values)
   
       let idMixture,idAgrochemical;

       if(values.mix) idMixture= this.state
                                     .fieldsOptions
                                     .mixsOptions
                                     .filter(option => option[0] === this.state.values.mix)
                                     .pop()[1]
       else idMixture=null

       if(values.agrochemical) idAgrochemical=this.state
                                                  .fieldsOptions
                                                  .agrochemicalOptions
                                                  .filter(option => option[0] === this.state.values.agrochemical)
                                                  .pop()[1]
       else idAgrochemical=null

       const treatmentData = {
         idAssay:this.state.id,
         name:values.name,
         description:values.description,
         experimentsLength:values.experimentsLength,
         idMixture:idMixture,
         idAgrochemical:idAgrochemical,
       }

       let treatment:Treatment = {
        name:treatmentData.name,
        description:treatmentData.description,
        experimentsLength:treatmentData.experimentsLength
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
             //aca estan los QR
            console.log(data)
            this.setState(prevState => {
                let treatments = prevState.treatments
                treatments.push(treatment)
                return {treatments,newTreatment:!this.state.newTreatment}
            })
         })
     }

    /* async fetchTreatments(){
         var treatments: Treatment[];
          fetch(
                buildUrl('https://nanivo-bush.herokuapp.com/ensayo/tratamientos',{
                    idAssay:1
                }), {
             method: "GET",
             mode: 'cors',
             headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json'
             }
           }).then(response => response.json())
             .then(data => {
                console.log(data)
                Object.keys(data).forEach(key => {

                    var treatment:Treatment
                    treatment.idAssay = data[key].idAssay
                    treatment.idTreatment = data[key].idTreatment
                    treatment.idMixture = data[key].idMixture
                    treatment.idAgrochemical = data[key].idAgrochemical
                    treatment.name = data[key].name
                    treatment.description = data[key].description

                    treatments.push(treatment)
                })
                return treatments
            })
     }*/
   
     handleClick = (e:React.MouseEvent<HTMLElement>):void => {
       this.setState({newTreatment:!this.state.newTreatment})
     }
     
   
     handlePrevStep = (e:React.MouseEvent<HTMLElement>):void => {
       this.setState({successAssay:false})
     }

    render(){
        return(
            <div className="crud-container">
                <div>
                    <div className="title-wrapper">
                    <img src="../../assets/images/head-icon.png"/>
                    <p>Ensayos</p>
                    </div>

                    <div className="assay-wrapper">

                    {!this.state.successAssay && (
                    
                        <div className="assay-container">
                            <Stepper title="PASO 1" 
                                     description="Agregue los datos del nuevo ensayo"/>
                            <AssayForm handleValues={this.handleAssayValues}
                                       fieldsOptions={this.state.fieldsOptions}/>
                        </div>
                    )}

                    {this.state.successAssay && (
                        <div className="treatments-container">
                            <Stepper title="PASO 2" 
                                     description="Agregue los tratamientos"/>
                            <Treatments treatments={this.state.treatments}/>
                                
                            <button type="button" onClick={this.handleClick}>
                                Nuevo tratamiento
                            </button>


                            {this.state.newTreatment && 
                                <TreatmentForm handleValues={this.handleTreatmentValues}/>
                            }

                            <button type="button" onClick={this.handlePrevStep}>
                                Atras
                            </button>

                        </div>
                    )}

                    </div>

                </div>
            </div>
            
        )
    }
}

export default Assay;