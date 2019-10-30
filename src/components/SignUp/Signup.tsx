import * as React from "react";
import UserForm from "../Users/UserForm";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { RouteComponentProps } from "react-router";
import { User } from "../../Interfaces/User";

class Signup extends React.Component<RouteComponentProps> {

    submitForm = (newUser:User): Promise<boolean> => {
      return BushService.post('/usuarios/insertar', newUser)
                        .then(() => {return true})
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
                                Bienvenido! Registrate para comenzar a monitorear tus ensayos en tiempo real.
                            </div>
                        </div>
                        
                        <UserForm submitForm={this.submitForm.bind(this)}/>
                        
                    </div>
            </div>
        );
    }
};

export default Signup;