import * as React from 'react'
import AssayForm from './components/Form/AssayForm';
import { IValues } from '../Form/Form';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../services/bush';
import Button from '../Utilities/Buttons/DefaultButton/Button';
import Loader from '../Utilities/Loader/Loader';

export interface IAssayProps extends RouteComponentProps{

}

export interface IAssay{
  id?:Number,
  name:string,
  description:string,
  idCrop:Number,
  idUserCreator?:Number
}

export interface IAssayState{
    assay:IAssay
    successAssay: boolean,
    loading:boolean
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
            loading: true
          }
        
         this.submitAssayForm=this.submitAssayForm.bind(this)
    }

  setLoading(value:boolean){
      this.setState({loading:value})
  }

 submitAssayForm=(newAssay:IAssay):Promise<boolean> => {
    console.log(newAssay)
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
              <div className="crud-wrapper">
                
                <div className="crud-title">
                  <h1>Ensayo</h1>
                </div>
                <div className="assay-form-wrapper">
                    {this.state.successAssay && 
                      <div className="assay-to-treatments"
                          onClick={()=>this.goToTreatments()}>
                        Ingresa los tratamientos del ensayo
                      </div>
                    }
                    <AssayForm submitAssayForm={this.submitAssayForm.bind(this)}
                                />
                </div>

              </div>
            </div>
        )
    }
}

export default Assay;