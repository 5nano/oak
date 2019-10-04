import * as React from 'react'
import AssayForm from './AssayForm';
import { IValues } from '../Form/Form';
import Treatments from './Treatments';
import TreatmentForm from './TreatmentForm';

export interface IAssayProps{

}

export interface IAssayState{
    id:Number,
    values:{name:string,
            description:string,
            crop:string,
            agrochemical:string,
            mix:string},
    treatments: Array<IValues>,
    newTreatment:boolean,
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
            id:null,
            values: {name:'',
                    description:'',
                    crop:'',
                    agrochemical:'',
                    mix:'',
                    },
            treatments: [],
            newTreatment: false,
            successAssay: false,
            loading: {
              agrochemicals:true,
              mixs:true,
              crops:true,
            }
          }
    }

 handleAssayValues=(values:IValues):void=>{
     console.log(values)
    /*
       const assayData = {
         name:values.name,
         description:values.description,
         idMixture:this.state.values.mix,
         idAgrochemical:this.state.values.agrochemical,
         idCrop:this.state.values.crop
       }
       fetch('', {
         method: "POST",
         mode: 'cors',
         body: JSON.stringify(assayData),
         headers: {
           'Content-Type': 'application/json',
           Accept: 'application/json'
         }
       }).then(response => {return response.json()})
         .then(data =>{
           console.log(data);
           this.setState({id:data['idAssay'],successAssay:true})
         })*/
       
       //Proximo paso
      this.setState({successAssay:true})
   
      //Guardo el estado por si vuelve atras
      this.setState({values: {...this.state.values, ...values}});
   
     }
   
     handleTreatmentValues=(values:IValues):void=>{
       console.log(values)
   /*
       const data = {
         idAssay:this.state.id,
         name:values.name,
         description:values.description,
         experimentsLength:values.experimentsLength,
         idMixture:this.state.values.mix,
         idAgrochemical:this.state.values.agrochemical,
       }*/
       //this.setState({treatments:[...this.state.treatments,values]})
     }
   
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
                            <p>PASO 1: Agregue los datos del ensayo</p>
                            <AssayForm handleValues={this.handleAssayValues}/>
                        </div>
                    )}

                    {this.state.successAssay && (
                        <div className="treatments-container">
                            <p>PASO 2: Agregue los tratamientos del ensayo</p>
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