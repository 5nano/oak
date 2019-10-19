import * as React from "react";
import UserForm from "../Users/UserForm";
import { IValues } from "../Form/Form";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { RouteComponentProps } from "react-router";
import Success from "../Utilities/Messages/Success";
import Error from '../Utilities/Messages/Error';


const Signup: React.SFC<RouteComponentProps> = (props) => {

    const [successSignUp,setSuccessSignUp] = React.useState(false)
    const [serverError,setServerError] = React.useState(null)
    const submitForm = (values:IValues): Promise<boolean> => {
    
      return BushService.post('/usuarios/insertar', values) 
        .then(() => {
            setSuccessSignUp(true)
            return true
        })
    }
  
  return (
      <div className="landing">
            <div className="landing-header">
                <div className="landing-logo">
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
                    <Button title="Log In" onClick={()=>props.history.push('/')} />
                </div>
            </div>
            <div className="landing-container">
                <div className="landing-info">
                    <div className="info-heading">
                        Automatización para ensayos de cultivos en laboratorios.
                    </div>
                    <div className="info-content">
                        Bienvenido! Registrate para comenzar a monitorear tus ensayos en tiempor real.
                    </div>
                </div>
                <div className="signup">
                    {successSignUp && (
                        <Success message="Nuevo usuario registrado"/>
                    )}
                    {serverError && (
                        <Error message={serverError}/>
                    )}
                    <UserForm submitForm={submitForm}/>
                </div>
            </div>
      </div>
 );
};

export default Signup;