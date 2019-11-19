import * as React from 'react'
import AssayForm from './components/Form/AssayForm';
import { IValues } from '../Form/Form';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../services/bush';
import Button from '../Utilities/Buttons/DefaultButton/Button';
import Loader from '../Utilities/Loader/Loader';
import { Snackbar } from '@material-ui/core';
import MySnackbarContentWrapper, { Feedback } from '../Feedback/MySnackbarContentWrapper';

export interface IAssayProps extends RouteComponentProps{

}

export interface IAssay{
  id?:Number,
  name:string,
  description:string,
  idCrop:Number,
  estimatedFinished: string,
  idUserCreator?:Number
}

export interface IAssayState{
    assay:IAssay
    feedback:Feedback,
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
              estimatedFinished:''
            },
            feedback:null,
            loading: true
          }
        
         this.submitAssayForm=this.submitAssayForm.bind(this)
    }

  setLoading(value:boolean){
      this.setState({loading:value})
  }

 submitAssayForm=(newAssay:IAssay):Promise<boolean> => {
   
       return BushService.post('/ensayos/insertar', newAssay)
         .then(data => {
            let assayId = data["idAssay"]
            newAssay.id = assayId
            this.setState({assay:newAssay,feedback:{variant:'success',message:'El ensayo fue creado exitosamente!'}})
            this.sendNewAssayEmail(newAssay)
            return true;
        })
        .catch(error=>{
          error.json().then(error=>this.setState({feedback:{variant:'error',message:error.message}}))
          return false
        })
     }

     sendNewAssayEmail(assay:IAssay){
      let htmlToSend = {
        subject: `El ensayo ${assay.name} ha sido creado`,
        html: "<html><img src='https://i.ibb.co/dgLfMrs/new-assay.png'/></html>",
      }
      BushService.post("/mailSender",htmlToSend)
                .then(()=> {console.log("mail enviado")})
     }


     goToTreatments(){
        this.props.history.push(`/assay/${this.state.assay.id}/treatments`)
     }

     private handleSnackbarClose(event?: React.SyntheticEvent,reason?:string) {
      if (reason ==='clickaway') { 
          return;
      }
      this.setState({feedback:null})
  }
    render(){
        return(
            <div className="crud-container">
              <div className="crud-wrapper">
                
                <div className="crud-title">
                  <h1>Ensayo</h1>
                </div>

                {this.state.feedback!=null && this.state.feedback.variant === 'success'?
                [<div className="info-content">
                  <div className="info-content-image">
                    <img src="../../../assets/images/success-plant.png"/>
                  </div>
                  <div className="info-content-description">
                     <h4>¡Bien! Creaste un nuevo ensayo</h4>
                     <p>Ahora solo tenés que ingresar sus tratamientos.</p>
                  </div>
                  
                </div>,
                <div style={{marginTop:'20px'}}>
                <Button title="Ingresar tratamientos"
                        onClick={()=>this.goToTreatments()} />
                </div>]
                :
                <div className="assay-form-wrapper">
                   <AssayForm submitAssayForm={this.submitAssayForm.bind(this)}/>
                </div>
                }

              </div>

              <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={this.state.feedback!=null}
                onClose={this.handleSnackbarClose.bind(this)}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleSnackbarClose.bind(this)}
                        variant={this.state.feedback? this.state.feedback.variant : 'success'}
                        message={this.state.feedback? this.state.feedback.message:''}/>
                </Snackbar>
            </div>
        )
    }
}

export default Assay;