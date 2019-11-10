import * as React from "react";
import UserForm from "../Users/UserForm";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { RouteComponentProps } from "react-router";
import { User } from "../../Interfaces/User";
import MySnackbarContentWrapper, { Feedback } from "../Feedback/MySnackbarContentWrapper";
import { Snackbar } from "@material-ui/core";

interface SignUpState{
    feedback:Feedback
}

class Signup extends React.Component<RouteComponentProps,SignUpState> {

    constructor(props){
        super(props);

        this.state = {
            feedback:null
        }
    }

    
    submitForm = (newUser:User): Promise<boolean> => {
      return BushService.post('/usuarios/insertar', newUser)
                        .then(() => {
                            this.sendSignUpEmail(newUser)
                            return true
                        })
    }

    sendSignUpEmail = (user:User) => {
        let payloadEmail = {
            subject: "¡NANIVO te da la bienvenida!",
            html:"<html><img src='https://i.ibb.co/j6YxFcN/new-user.jpg'/></html>",
        }
    
        BushService.post(`/mailSender/unregisteredUser?mail=${user.email}`,payloadEmail)
                  .then(()=> {
                    this.setState({feedback:{variant:'success',message:'Revisa tu casilla de correo electrónico'}})

                  })
    }

    private handleSnackbarClose(event?: React.SyntheticEvent,reason?:string) {
        if (reason ==='clickaway') { 
            return;
        }
        this.setState({feedback:null})
    }
  
    render(){
        return (
            <div className="landing">
                    <div className="landing-header">
                        <div className="landing-logo" onClick={()=>this.props.history.push('/')}>
                            <img src='../../assets/images/nanivo-logo.png'/>
                        </div>
                        <div className="landing-links">
                            <div className="link">
                                <h4>Contacto</h4>
                            </div>
                            <div className="link">
                                <h4>Nosotros</h4>
                            </div>
                        </div>
                        <div className="landing-user">
                            <Button title="Log In" onClick={()=>this.props.history.push('/')} />
                        </div>
                    </div>
                    <div className="landing-container">
                        <div className="landing-info">
                            <div className="info-heading">
                                Automatización para ensayos de cultivos en laboratorios.
                            </div>
                            <div className="info-content">
                                Configura tu cuenta y comenza a monitorear tus ensayos en tiempo real.
                            </div>
                        </div>
                        
                        <div className="user-form-container">
                            <UserForm submitForm={this.submitForm.bind(this)}/>
                        </div>
                    </div>

                    <Snackbar 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={this.state.feedback!=null}
                        autoHideDuration={6000}
                        onClose={this.handleSnackbarClose.bind(this)}
                        >
                            <MySnackbarContentWrapper
                                onClose={this.handleSnackbarClose.bind(this)}
                                variant={this.state.feedback? this.state.feedback.variant : 'success'}
                                message={this.state.feedback? this.state.feedback.message:''}/>
                </Snackbar>
            </div>
        );
    }
};

export default Signup;