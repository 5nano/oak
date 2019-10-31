import * as React from 'react'
import AssayForm from './components/Form/AssayForm';
import { IValues } from '../Form/Form';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../services/bush';
import Button from '../Utilities/Buttons/DefaultButton/Button';

export interface IAssayProps extends RouteComponentProps{

}

export interface IAssay{
  id?:Number,
  name:string,
  description:string,
  idCrop:Number,
  idUserCreator:Number
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
              idUserCreator: null
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
 submitAssayForm=(newAssay:IAssay):Promise<boolean> => {
    
       return BushService.post('/ensayos/insertar', newAssay)
         .then(data => {
            let assayId = data["idAssay"]
            newAssay.id = assayId
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
                <div className="crud-title">
                  Ensayo
                </div>
                <div className="assay-form-wrapper">
                    {this.state.successAssay && 
                      <div className="assay-to-treatments"
                          onClick={()=>this.goToTreatments()}>
                        Ingresa los tratamientos del ensayo
                      </div>
                    }
                    <AssayForm submitAssayForm={this.submitAssayForm.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default Assay;